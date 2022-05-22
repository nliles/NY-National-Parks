import { withRouter } from "react-router";
import ParkContent from "../Content";
import usePark from "../../../hooks/usePark";

const ParkView = ({ match }) => {
  const { parks, loading, error } = usePark(match.params.id);
  const park = parks[0] || {};

  return <ParkContent park={park} loading={loading} error={error} />;
};

export default withRouter(ParkView);
