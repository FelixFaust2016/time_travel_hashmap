class TimeTravelHashmap {
  constructor() {
    this.timeTravelStore = new Map();
  }

  put(key, timestamp, value) {
    //first I will check if the key exists in the store I created and set it if it does not

    if (!this.timeTravelStore.get(key)) {
      this.timeTravelStore.set(key, []);
    }

    // Then I will lookup the key and set it to this {timestamp, value}

    this.timeTravelStore.get(key).push({ timestamp, value });
  }

  getObviousSolution(key, timestamp) {
    const timeTravlEntires = this.timeTravelStore.get(key);

    // This checks whether the key exists
    if (!timeTravlEntires) {
      return "This inputed key is invalid!!!";
    }

    // At this point I will conduct a reversze loop to check which value is closest to the timestamp or the same as it
    for (let i = timeTravlEntires.length - 1; i >= 0; i--) {
      if (timeTravlEntires[i].timestamp <= timestamp) {
        return timeTravlEntires[i].value;
      }
    }

    return null;
  }

  // For this solution I will be using a binary search, this will basically jump to the middle an then depending on whether the value of the middle is too big or to small checks the right and left hand side
  getOptimalSolution(key, timestamp) {
    const timeTravlEntires = this.timeTravelStore.get(key);

    if (!timeTravlEntires) {
      return "This inputed key is invalid!!!";
    }

    let result = "";
    let right = timeTravlEntires.length - 1;
    let left = 0;

    while (left <= right) {
      const middle = Math.floor(left + right / 2);

      if (timeTravlEntires[middle].timestamp === timestamp) {
        return timeTravlEntires[middle].value;
      } else if (timeTravlEntires[middle].timestamp < timestamp) {
        result = timeTravlEntires[middle].value;
        left = middle + 1;
      } else {
        right = middle - 1;
      }
    }

    return result;
  }
}

const tth = new TimeTravelHashmap();

tth.put("foo", 1, "car");
tth.put("foo", 6, "jar");

console.log(tth.getOptimalSolution("foo", 1)); //car
console.log(tth.getOptimalSolution("foo", 6)); //jar
console.log(tth.getOptimalSolution("foo", 3)); //car
console.log(tth.getOptimalSolution("foo", 8)); //jar
console.log(tth.getOptimalSolution("foo", 10)); //jar
