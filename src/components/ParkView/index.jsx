import { withRouter } from "react-router";
import ParkContent from "../ParkContent";
import useParks from "../hooks/useParks"

const ParkView = ({ match }) => {
  const { parks, loading, error } = useParks(match.params.id)
  const park = parks[0] || {}

  return (<ParkContent park={park} loading={loading} error={error}/>);
}

export default withRouter(ParkView);
