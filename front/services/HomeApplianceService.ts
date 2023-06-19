import { Service } from "~/services/Service"
import { HomeAppliance } from "~/models/HomeAppliance"

class HomeApplianceService extends Service<HomeAppliance> {
  path = 'home-appliances'
}

export { HomeApplianceService }
