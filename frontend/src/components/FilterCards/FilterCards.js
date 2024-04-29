import { Star } from "@material-ui/icons";

import "./filtercards.scss";

export default function FilterCards(props) {
  const { filterByDistance, userAddress } = props;

  return (
    <>
      <h3 className="useraddress">{userAddress}</h3>
      {filterByDistance && filterByDistance.map((filteredPin) => (
        <div className="rate-card" key={filteredPin.pin._id}>
          <h3 className="h3-pinPlace">{filteredPin.pin.place}</h3>
          <h5 className="h5-pinDistance">
            Távolság tőled: {filteredPin.distance} km
          </h5>
          <h4>
            {Array(filteredPin.pin.rating).fill(
              <Star className="star" key={filteredPin.pin._id} />
            )}
          </h4>
          <p>{filteredPin.pin.desc}</p>
        </div>
      ))}
    </>
  );
}
