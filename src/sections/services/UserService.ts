import axios from 'axios';
import { ResponseModel } from 'src/models/ResponseModel';
import { ActiveMembership } from 'src/models/ActiveMembership';
import { Properties } from 'src/properties';
import { ActiveMembershipCreationDTO } from '../../models/ActivateMembershipCreationDTO';

const properties = Properties.getInstance();
const client = axios.create({ baseURL: properties.baseURL });

export async function getUsers(): Promise<ResponseModel<ActiveMembership[]>> {
  let res: ActiveMembership[] = [];
  await client.get(properties.GetActiveMembership).then(async (response) => {
    if (response.status === 200 || response.status === 201) {
      const data = await response.data;
      res = data.map(ActiveMembership.fromJson(data));
        return new ResponseModel<ActiveMembership[]>(true, res, undefined, 'Operation completed');
    }
      return new ResponseModel<ActiveMembership[]>(false, res, response.data, response.statusText);

  });

}

export async function startMembership(data: any): Promise<ResponseModel<String>> {
  const model = ActiveMembershipCreationDTO.fromJSON(data);

  try {
    const response = await client.post(properties.ActivateMembership, model);

      if (response.status === 200 || response.status === 200) {
          return new ResponseModel<String>(true, "", undefined, 'Operation completed');
      }
      return new ResponseModel<String>(false, "", response.data, response.statusText);

  } catch (error) {
    console.error('Error activating membership:', error);
      return new ResponseModel<String>(false, "", "Error activating Membership", error.message);

  }
}
