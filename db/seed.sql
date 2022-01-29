INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Legal"),
       ("Finance")
       ;

INSERT INTO role(title, salary, department_id)
VALUES ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 4),
       ("Accountant", 125000, 4)
       ("Legal Team Lead", 250000, 3),
       ("Lawyer", 190000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
        ("Mike", "Chan", 2, 1),
       ("Ashley", "Rodriguez" 3, NULL),
       ("Kevin", "Tupik", 4, 3),
       ("Kumal", "Singh", 5, NULL),
       ("Malia", "Brown", 6, 5),
       ("Sarah", "Lourd", 7, NULL),
       ("Tom","Allen", 8, 7)
       ;