const useTimeDifferenceDisplay = (date) => {
  const givenDate = new Date(date);

  // Current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = currentDate - givenDate;

  // Convert milliseconds to days and remaining milliseconds
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const differenceInDays = Math.floor(
    differenceInMilliseconds / millisecondsInADay
  );
  const remainingMilliseconds = differenceInMilliseconds % millisecondsInADay;

  // Convert remaining milliseconds to hours
  const millisecondsInAnHour = 1000 * 60 * 60;
  const differenceInHours = Math.floor(
    remainingMilliseconds / millisecondsInAnHour
  );

  // Construct the output string
  let timeDifferenceString = "";
  if (differenceInDays > 0) {
    timeDifferenceString += `${differenceInDays} day${
      differenceInDays > 1 ? "s" : ""
    }`;
  }

  if (differenceInHours > 0) {
    timeDifferenceString += ` ${differenceInHours} hour${
      differenceInHours > 1 ? "s" : ""
    }`;
  }

  if (differenceInHours === 0) {
    timeDifferenceString += `${differenceInHours} hours`;
  }

  timeDifferenceString += " ago";

  return timeDifferenceString;
};

export default useTimeDifferenceDisplay;
