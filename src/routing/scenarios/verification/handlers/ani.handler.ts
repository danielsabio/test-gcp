import {
  getCustomersByANI,
  getCustomersWithUniqHouseNumber,
  getCustomersWithUniqZipCode,
} from '../../../../features/customer';
import { DFReq, DFRes } from '../../../../types/cx';
import { VERIFICATION_STAGE } from '../../../../types/verification';

export const aniHandler = async (req: DFReq, ani: string): Promise<DFRes> => {
  const customers = await getCustomersByANI(req.sessionInfo.session, ani);

  const result = {
    customers: customers.length,
    customers_with_uniq_zip_code: getCustomersWithUniqZipCode(customers).length,
    customers_with_uniq_house_number: getCustomersWithUniqHouseNumber(customers).length,
  };

  if (result.customers === 0) {
    return { sessionInfo: { parameters: { verification_stage: VERIFICATION_STAGE.ASK_ANI_2 } } };
  }

  if (result.customers === 1) {
    return { sessionInfo: { parameters: { verification_stage: VERIFICATION_STAGE.FOLLOWUP } } };
  }

  if (result.customers_with_uniq_house_number === 0 && result.customers_with_uniq_house_number === 0) {
    return { sessionInfo: { parameters: { verification_stage: VERIFICATION_STAGE.UNVERIFIED } } };
  }

  return {};
};
