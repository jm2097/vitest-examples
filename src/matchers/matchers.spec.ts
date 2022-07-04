import { describe, expect, test, vi } from "vitest";

describe("Matchers", () => {
  test("matchers", () => {
    // not
    expect(20).not.toBe(10);

    // toBe
    expect(16).toBe(16);

    // toBeCloseTo
    expect(0.2 + 0.1).toBeCloseTo(0.3);
    expect(0.4 + 0.18).toBeCloseTo(0.5, 0);
    expect(0.3 + 0.3).toBeCloseTo(0.6);

    // toBeDefined
    expect("something").toBeDefined();
    // toBeUndefined
    expect(undefined).toBeUndefined();

    // toBeTruthy
    expect("something").toBeTruthy();
    expect(true).toBeTruthy();
    expect([]).toBeTruthy();
    // toBeFalsy
    expect("").toBeFalsy();
    expect(0).toBeFalsy();
    expect(null).toBeFalsy();

    // toBeNull
    expect(null).toBeNull();
    // toBeNaN
    expect(Number("I'll return NaN")).toBeNaN();

    // toBeTypeOf
    expect("I am a string").toBeTypeOf("string");
    expect(true).toBeTypeOf("boolean");
    expect(new Date()).toBeTypeOf("object");
    expect(() => "Hello, world!").toBeTypeOf("function");

    // toBeInstanceOf
    expect(new Error()).toBeInstanceOf(Error);

    // toBeGreaterThan
    expect(10).toBeGreaterThan(5);
    expect(10).toBeGreaterThanOrEqual(10);
    // toBeLessThan
    expect(5).toBeLessThan(10);
    expect(5).toBeLessThanOrEqual(5);

    // toEqual
    {
      const person = { id: 1, name: "María" };
      expect(person).toEqual({ id: 1, name: "María" });

      const names = ["Pedro", "Lucas", "María"];
      expect(names).toEqual(["Pedro", "Lucas", "María"]);
    }
    // toStrictEqual
    {
      const person1 = { name: "Pedro", age: undefined };
      const person2 = { name: "Pedro" };
      expect(person1).toEqual(person2);
      expect(person1).not.toStrictEqual(person2);
    }

    // toContain
    expect(["mouse", "keyboard", "monitor"]).toContain("mouse");
    // toContainEqual
    {
      const fruits = [
        { fruit: "apple", stock: 15 },
        { fruit: "banana", stock: 42 },
        { fruit: "grape", stock: 34 },
      ];
      expect(fruits).toContainEqual({ fruit: "banana", stock: 42 });
    }

    // toHaveLength
    expect("abc").toHaveLength(3);
    expect([1, 2, 3]).toHaveLength(3);
    expect([]).not.toHaveLength(3);
    expect({ length: 3 }).toHaveLength(3);

    // toHaveProperty
    {
      const person = {
        id: 1,
        firstName: "María",
        lastName: "Gonzalez",
        dateOfBirth: new Date(1997, 7, 20),
        placeOfBirth: "Medellín",
        location: "",
        email: "mariagonzale@mail.com",
        addresses: [
          {
            type: "Home",
            value: "cra 6 #47-24",
          },
          {
            type: "Work",
            value: "cl 21 #10-12",
          },
        ],
      };
      expect(person).toHaveProperty("firstName");
      expect(person).toHaveProperty("lastName", "Gonzalez");
      expect(person).not.toHaveProperty("placeOfBirth", "Bogotá");
      expect(person).toHaveProperty("addresses[0].type", "Home");
      expect(person).toHaveProperty("addresses.1.type", "Work");
    }

    // toMatch
    expect("The quick brown fox jumps over the lazy dog").match(/jumps/);
    expect("This text should not contain any numbers").not.match(/[0-9]/);

    // toMatchObject
    {
      const person = {
        id: 1,
        firstName: "María",
        lastName: "Gonzalez",
        dateOfBirth: new Date(1997, 7, 20),
        placeOfBirth: "Medellín",
        location: "",
        email: "mariagonzale@mail.com",
        addresses: [
          {
            type: "Home",
            value: "cra 6 #47-24",
          },
          {
            type: "Work",
            value: "cl 21 #10-12",
          },
        ],
      };

      const personAddresses = {
        addresses: [
          {
            type: "Home",
            value: "cra 6 #47-24",
          },
          {
            type: "Work",
            value: "cl 21 #10-12",
          },
        ],
      };
      expect(person).toMatchObject(personAddresses);
    }

    // toThrowError
    {
      function getTaskFromDatabase() {
        throw new Error("This is not a back-end application");
      }

      expect(() => getTaskFromDatabase()).toThrowError();
      expect(() => getTaskFromDatabase()).toThrowError(/back-end/);
      expect(() => getTaskFromDatabase()).toThrowError("back-end");
    }

    // toMatchSnapshot
    {
      const data = { fruits: ["banana", "apple", "grape", "strawberry"] };
      expect(data).toMatchSnapshot();

      expect(data).toMatchSnapshot({ fruits: expect.any(Array) });
    }

    // toMatchInlineSnapshot
    {
      const data = { fruits: ["banana", "apple", "grape", "strawberry"] };
      expect(data).toMatchInlineSnapshot(`
        {
          "fruits": [
            "banana",
            "apple",
            "grape",
            "strawberry",
          ],
        }
      `);

      expect(data).toMatchInlineSnapshot(
        { fruits: expect.any(Array) },
        `
        {
          "fruits": Any<Array>,
        }
        `
      );
    }

    // toThrowErrorMatchingSnapshot
    {
      function getTaskFromDatabase() {
        throw new Error("This is not a back-end application");
      }

      expect(() => getTaskFromDatabase()).toThrowErrorMatchingSnapshot();
      expect(() => getTaskFromDatabase()).toThrowErrorMatchingInlineSnapshot(
        '"This is not a back-end application"'
      );
    }

    // toHaveBeenCalled
    {
      const person = {
        name: "María",
        walk() {
          return `${this.name} is walking`;
        },
      };

      const walkSpy = vi.spyOn(person, "walk");

      expect(walkSpy).not.toHaveBeenCalled();
      person.walk();
      expect(walkSpy).toHaveBeenCalled();
    }

    // toHaveBeenCalledOnce
    {
      const person = {
        name: "María",
        walk() {
          return `${this.name} is walking`;
        },
      };

      const walkSpy = vi.spyOn(person, "walk");

      person.walk();
      expect(walkSpy).toHaveBeenCalledOnce();
    }

    // toHaveBeenCalledTimes
    {
      const person = {
        name: "María",
        walk() {
          return `${this.name} is walking`;
        },
      };

      const walkSpy = vi.spyOn(person, "walk");

      person.walk();
      person.walk();
      person.walk();

      expect(walkSpy).toHaveBeenCalledTimes(3);
    }

    // toHaveBeenCalledWith
    {
      const person = {
        name: "María",
        attack(victim: string, powerLevel: 10 | 20 | 30) {
          return `${this.name} is attacking ${victim} with a power level of ${powerLevel}`;
        },
      };

      const attackSpy = vi.spyOn(person, "attack");

      person.attack("Pedro", 20);
      person.attack("Sara", 10);

      expect(attackSpy).toHaveBeenCalledWith("Pedro", 20);
      expect(attackSpy).toHaveBeenCalledWith("Sara", 10);
    }

    // toHaveBeenLastCalledWith
    {
      const person = {
        name: "María",
        attack(victim: string, powerLevel: 10 | 20 | 30) {
          return `${this.name} is attacking ${victim} with a power level of ${powerLevel}`;
        },
      };

      const attackSpy = vi.spyOn(person, "attack");

      person.attack("Pedro", 20);
      person.attack("Sara", 10);

      expect(attackSpy).not.toHaveBeenLastCalledWith("Pedro", 20);
      expect(attackSpy).toHaveBeenLastCalledWith("Sara", 10);
    }

    // toHaveBeenNthCalledWith
    {
      const person = {
        name: "María",
        attack(victim: string, powerLevel: 10 | 20 | 30) {
          return `${this.name} is attacking ${victim} with a power level of ${powerLevel}`;
        },
      };

      const attackSpy = vi.spyOn(person, "attack");

      person.attack("Pedro", 10);
      person.attack("Pedro", 20); // <---- nth(2)
      person.attack("Pedro", 30);

      expect(attackSpy).toHaveBeenNthCalledWith(2, "Pedro", 20);
    }

    // toHaveReturned
    {
      function getPriceWithTaxes(price: number) {
        const TAXES = 0.19;
        return price + price * TAXES;
      }

      const getPriceWithTaxesSpy = vi.fn(getPriceWithTaxes);
      const price = getPriceWithTaxesSpy(10_000);

      expect(price).toBe(11_900);
      expect(getPriceWithTaxesSpy).toHaveReturned();
    }

    // toHaveReturnedTimes
    {
      function getPriceWithTaxes(price: number) {
        const TAXES = 0.19;
        return price + price * TAXES;
      }

      const getPriceWithTaxesSpy = vi.fn(getPriceWithTaxes);
      getPriceWithTaxesSpy(10_000);
      getPriceWithTaxesSpy(35_000);
      getPriceWithTaxesSpy(100_000);

      expect(getPriceWithTaxesSpy).toHaveReturnedTimes(3);
    }

    // toHaveReturnedWith
    {
      function getPriceWithTaxes(price: number): {
        price: number;
        taxes: number;
        total: number;
      } {
        const TAXES = 0.19;
        const total = price + price * TAXES;
        return { price, taxes: TAXES, total };
      }

      const getPriceWithTaxesSpy = vi.fn(getPriceWithTaxes);
      getPriceWithTaxesSpy(10_000);

      expect(getPriceWithTaxesSpy).toHaveReturnedWith({
        price: 10_000,
        taxes: 0.19,
        total: 11_900,
      });
    }

    // toHaveLastReturnedTimes
    {
      function getPriceWithTaxes(price: number) {
        const TAXES = 0.19;
        return price + price * TAXES;
      }

      const getPriceWithTaxesSpy = vi.fn(getPriceWithTaxes);
      getPriceWithTaxesSpy(10_000);
      getPriceWithTaxesSpy(35_000);
      getPriceWithTaxesSpy(100_000);

      expect(getPriceWithTaxesSpy).toHaveLastReturnedWith(119_000);
    }

    // toHaveNthReturnedWith
    {
      function getPriceWithTaxes(price: number) {
        const TAXES = 0.19;
        return price + price * TAXES;
      }

      const getPriceWithTaxesSpy = vi.fn(getPriceWithTaxes);
      getPriceWithTaxesSpy(10_000);
      getPriceWithTaxesSpy(35_000); // <---- nth(2)
      getPriceWithTaxesSpy(100_000);

      expect(getPriceWithTaxesSpy).toHaveNthReturnedWith(2, 41_650);
    }

    // toSatisfy
    {
      const isEven = (number: number) => number % 2 === 0;
      expect(2).toSatisfy(isEven);
      expect(3).not.toSatisfy(isEven);
    }
  });

  test("async matchers", async () => {
    // resolves
    {
      async function getProductInfo(): Promise<{
        name: string;
        price: number;
      }> {
        return Promise.resolve({
          name: "Keyboard",
          price: 350_000,
        });
      }

      await expect(getProductInfo()).resolves.toEqual({
        name: "Keyboard",
        price: 350_000,
      });
    }

    // rejects
    {
      async function getProductInfo(): Promise<{
        name: string;
        price: number;
      }> {
        return Promise.reject("You don't have the rights");
      }

      await expect(getProductInfo()).rejects.toThrow("rights");
    }
  });
});
