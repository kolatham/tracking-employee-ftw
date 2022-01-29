INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Legal"),
       ("Finance")
       ;

INSERT INTO role(title, salary, department_id)
VALUES ("Accountant", 125000, 4),
       ("Salesperson", 80000, 1),
       ("Software Engineer", 120000, 2),
       ("Legal Team Lead", 250000, 3),
       ("Lawyer", 190000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
        ("Mike", "Chan", 2, 1),
       ("Ashley", "Rodriguez" 3, NULL),
       ("Kevin", "Tupik", 3, 3),
       ("Kumal", "Singh", 1, NULL),
       ("Malia", "Brown", 1, 5),
       ("Sarah", "Lourd", 4, NULL),
       ("Tom","Allen", 5, 7)
       ;