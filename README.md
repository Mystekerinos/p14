# Composants HRNet React

## Composant Liste des Employés

Le composant Liste des Employés affiche un tableau contenant les détails des employés.

### Description

Ce composant est conçu pour afficher une vue tabulaire des informations des employés, comprenant :

- Prénom
- Nom de famille
- Date de début
- Département
- Date de naissance
- Rue
- Ville
- État
- Code postal

### Utilisation

Pour intégrer le composant Liste des Employés dans votre projet :

1. Assurez-vous que React est configuré dans votre environnement de projet.
2. Importez le composant Liste des Employés.
3. Passez un tableau d'objets d'employés à la propriété `employees`.

#### Exemple :

```jsx
import React from "react";
import EmployeeList from "./chemin/vers/EmployeeList";

const VotreComposant = () => {
  const employees = [
    {
      firstName: "John",
      lastName: "Doe",
      startDate: "2023-01-01",
      department: "Ventes",
      dateOfBirth: "1990-01-01",
      street: "123 rue Principale",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
    },
    // Ajoutez plus d'objets d'employés selon vos besoins
  ];

  return (
    <div>
      <EmployeeList employees={employees} />
    </div>
  );
};

export default VotreComposant;
```
