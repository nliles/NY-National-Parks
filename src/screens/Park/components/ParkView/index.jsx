import { useLocation } from "react-router-dom";
import ParkContent from "../Content";
import usePark from "../../../hooks/usePark";

const ParkView = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitPath = pathname.split("/");
  const { parks, loading, error } = usePark({ parkCode: splitPath[2] });
  const park = parks?.[0] || {};

  return <ParkContent park={park} loading={loading} error={error} />;
};

export default ParkView;
