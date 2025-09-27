import { RESPONSE_CONST } from './constants/constant';
import { logger } from '@common/logger';

export const successMessage = (
  message: string,
  code: string,
  data: any,
  token?: string,
) => {
  logger.info(`Success code ${code}`);
  return {
    success: RESPONSE_CONST.SUCCESS,
    code,
    message,
    data,
    token,
  };
};

export const errorMessage = (message: string, code: string, data?: any) => {
  logger.error(`Error code ${code}`);
  return {
    success: RESPONSE_CONST.ERROR,
    code,
    message,
    data,
  };
};
