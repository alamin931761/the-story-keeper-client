// import { useContext, useEffect, useState } from "react";
// import { NEW_ARRIVAL_CONTEXT } from "../Context/NewArrivalBooks";

// const useNewArrivals = () => {
//   const { size, page, minimumSliderValue, maximumSliderValue } =
//     useContext(NEW_ARRIVAL_CONTEXT);
//   const [count, setCount] = useState(0);
//   const [newArrivals, setNewArrivals] = useState([]);

//   useEffect(() => {
//     fetch(
//       `http://localhost:5000/api/v1//newArrivals?page=${page}&size=${size}`,
//       {
//         headers: {
//           minimum_slider_value: minimumSliderValue,
//           maximum_slider_value: maximumSliderValue,
//         },
//       }
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setNewArrivals(data.books);
//         setCount(data.count);
//       });
//   }, [maximumSliderValue, minimumSliderValue, size, page]);

//   return { newArrivals, count };
// };
// export default useNewArrivals;
