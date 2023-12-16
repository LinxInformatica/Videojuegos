// testing
import { describe, beforeEach, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// helpers
import componentToUse from "./helpers/componentToUse";
import apiMock from "./helpers/apiMock";


describe("<App/>", () => {
  const routes = ["/", "/details/1", "/home"];

  beforeEach(async () => {
    apiMock();
  });

  componentToUse();

  describe("Landing:", () => {
    test("El componente Landing debe ser renderizado en la ruta /", () => {
      render(componentToUse(routes[0]));
      expect(screen.getByTestId("Landing")).toBeInTheDocument();
    });

    test("El componente Landing debe ser renderizado en la ruta /details/:id", () => {
      render(componentToUse(routes[1]));
      expect(screen.getByTestId("Landing")).toBeInTheDocument();
    });

  });

  describe("Home:", () => {
    test("El componente Home debe ser renderizado en la ruta /home", () => {
      render(componentToUse(routes[0]));
      expect(screen.getByTestId("Home")).toBeInTheDocument();
    });

    test("El componente Home NO debe renderizarse en ninguna otra ruta", () => {
      render(componentToUse(routes[1]));
      expect(screen.queryByTestId("Home")).not.toBeInTheDocument();
    });
  });
});