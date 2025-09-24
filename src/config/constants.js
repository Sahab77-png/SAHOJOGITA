import { API_KEY } from '@env';
//Disables console warning
import authHelper from '../utils/authHelper';
import chatHelper from '../utils/chatHelper';
import eventHelper from '../utils/eventHelper';
import forumHelper from '../utils/forumHelper';
import resourceHelper from '../utils/resourceHelper';
if (!API_KEY) {
  console.error('Missing required environment variables:API_KEY');
}
const constants = {
  API_KEY,
  authHelper,
  chatHelper,
  eventHelper,
  forumHelper,
  resourceHelper,
};
//Exporting constants as default
export default constants;
