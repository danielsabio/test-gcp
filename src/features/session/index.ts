import { RedisDB } from '../../infra/redis';
import { Session } from '../../types/session';
import { assert } from '../../util/assert';

export async function getSession(id: string) {
  return RedisDB.get<Session>(id);
}

export async function setSession(id: string, data: Partial<Session>) {
  const session = await getSessionOrFail(id);
  await RedisDB.set<Session>(id, { ...session, ...data });
}

export async function getSessionOrFail(id: string) {
  const session = await getSession(id);
  assert(session, `session is missing for given id: ${id}`);
  return session;
}

export async function ensureSession(id: string, data: Partial<Session>) {
  const session = await getSession(id);

  if (!session) {
    await RedisDB.set<Session>(id, { id, verified: data.verified || false });
  }

  return getSessionOrFail(id);
}
