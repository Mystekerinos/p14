

# p14: Faites passer une librairie jQuery vers React

**Conversion des plugins jQuery en composants React.**

Le formulaire d'ajout d'employés permet de créer de nouveaux employés en saisissant des informations telles que le prénom, le nom, la date de naissance, la date de début, l'adresse et le département. Les informations saisies sont validées, et des messages d'erreur s'affichent si les données ne sont pas valides.

Les informations des employés sont stockées dans le stockage local du navigateur. Chaque fois qu'un nouvel employé est ajouté, il est également ajouté à cette liste d'employés.

L'API Context est utilisée pour partager des données entre différents composants. Un `EmployeeContext` est créé pour gérer les informations liées aux employés, et il est fourni par l'`EmployeeProvider`.

L'application utilise React Router pour le routage. Il y a deux routes principales dans l'application : l'une pour le formulaire d'ajout d'employé ("/") et l'autre pour afficher la liste des employés ("/view-employees"). Toute autre route mène à une page 404.

Un composant de modal est utilisé pour confirmer l'ajout réussi d'un nouvel employé.

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
