import * as AccountBalance from './scenarios/account-balance';
import * as Verification from './scenarios/verification';
import * as Welcome from './scenarios/welcome';

export const endpoints = [...Welcome.endpoints, ...Verification.endpoints, ...AccountBalance.endpoints];
