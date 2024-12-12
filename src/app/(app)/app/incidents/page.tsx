import { Alerts } from "../elements/alerts";
import { AllAlerts } from "./elements/allAlerts";

export default function Incidents() {
  return (
    <div className="container mt-2">
      <Alerts />
      <div className="my-4">
        <h1 className="text-2xl capitalize">all incidents</h1>
        <AllAlerts />
      </div>
    </div>
  );
}
