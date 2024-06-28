import create from "zustand";

const getLocalStorageData = (key, defaultValue = []) => {
  try {
    const storedData = localStorage.getItem(key);
    console.log(`Stored data for key '${key}':`, storedData);

    if (storedData === null || storedData === undefined) {
      return defaultValue;
    }
    if (typeof storedData === "string") {
      console.log(`Parsing JSON for key '${key}':`, storedData);
      return JSON.parse(storedData);
    } else {
      console.error(
        `Les données récupérées depuis localStorage pour la clé '${key}' ne sont pas une chaîne valide:`,
        storedData
      );
      return defaultValue;
    }
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des données depuis localStorage pour la clé '${key}':`,
      error
    );
    return defaultValue;
  }
};

const setLocalStorageData = (key, data) => {
  try {
    if (data !== undefined) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error(
      `Erreur lors de la sauvegarde des données dans localStorage pour la clé '${key}':`,
      error
    );
  }
};

const useEmployeeStore = create((set) => ({
  employees: getLocalStorageData("employees", []),

  fetchEmployees: async () => {
    try {
      const response = await fetch("/api/employees");
      if (!response.ok) {
        throw new Error("Échec de la récupération des employés");
      }
      const data = await response.json();
      setLocalStorageData("employees", data);
      set({ employees: data });
    } catch (error) {
      console.error("Erreur lors de la récupération des employés :", error);
    }
  },

  setEmployees: (newEmployees) => {
    try {
      if (newEmployees !== undefined) {
        setLocalStorageData("employees", newEmployees);
        set({ employees: newEmployees });
      } else {
        console.error(
          "Tentative de sauvegarde de données undefined dans localStorage"
        );
      }
    } catch (error) {
      console.error(
        `Erreur lors de la sauvegarde des données dans localStorage pour la clé 'employees':`,
        error
      );
    }
  },

  addEmployee: (employee) => {
    try {
      set((state) => {
        const updatedEmployees = [...state.employees, employee];
        setLocalStorageData("employees", updatedEmployees);
        return { employees: updatedEmployees };
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un employé :", error);
    }
  },
}));

export default useEmployeeStore;
