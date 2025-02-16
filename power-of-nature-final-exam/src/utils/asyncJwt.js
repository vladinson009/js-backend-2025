import jsonwebtoken from 'jsonwebtoken';
import util from 'util';

export const sign = util.promisify(jsonwebtoken.sign);
export const verify = util.promisify(jsonwebtoken.verify);
export const decode = util.promisify(jsonwebtoken.decode);
