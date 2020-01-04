export default () => {
  const availability = {
    monday: {
      morning: false,
      afternoon: false,
      evening: false
    },
    tuesday: {
      morning: false,
      afternoon: false,
      evening: false
    },
    wednesday: {
      morning: false,
      afternoon: false,
      evening: false
    },
    thursday: {
      morning: false,
      afternoon: false,
      evening: false
    },
    friday: {
      morning: false,
      afternoon: false,
      evening: false
    },
    saturday: {
      morning: false,
      afternoon: false,
      evening: false
    },
    sunday: {
      morning: false,
      afternoon: false,
      evening: false
    }
  };
  return JSON.stringify(availability);
};
