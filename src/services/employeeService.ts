import { Employee } from "@/types/employee";
import * as api from "@/server/api";
import apiEndpoints from "@/server/apiRouteConstant";

export async function getEmployeeDetails(): Promise<any> {
  try {
    return await api.get<Employee>(apiEndpoints.Employee.getEmployee);
  } catch (error: any) {
    console.log(error);
  }
}
