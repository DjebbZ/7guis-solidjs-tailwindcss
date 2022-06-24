import { Component } from "solid-js";
import { createMachine, assign } from "xstate";

const bookingMachine = createMachine({
  id: "flightBooker",
  initial: "booking.oneway",
  context: {
    departureDate: undefined,
    returnDate: undefined,
    trip: "oneway",
  },
  schema: {
    context: {} as {
      departureDate: undefined | Date;
      returnDate: undefined | Date;
      trip: "oneway" | "roundTrip";
    },
    events: {} as
      | { type: "UPDATE_TRIP"; value: "oneway" | "roundTrip" }
      | {
          type: "UPDATE_DEPARTURE";
          date: Date;
        }
      | { type: "UPDATE_RETURN"; date: Date }
      | { type: "SUBMIT" },
  },
  states: {
    booking: {
      states: {
        oneway: {
          entry: assign({ trip: "oneway" }),
          on: {
            UPDATE_TRIP: "twoways",
            UPDATE_DEPARTURE: {
              actions: assign({
                departureDate: (_, evt) => evt.value,
              }),
            },
          },
        },
        twoways: {
          entry: assign({ trip: "roundTrip" }),
          on: {
            UPDATE_TRIP: {
              target: "oneway",
            },
            UPDATE_DEPARTURE: {
              actions: assign({
                departureDate: (_, evt) => evt.value,
              }),
            },
            UPDATE_RETURN: {
              actions: assign({
                returnDate: (ctx, evt) => evt.value,
              }),
            },
          },
        },
      },
    },
  },
});

const FlightBooker: Component = () => {
  return <h1>Hello</h1>;
};

export default FlightBooker;
