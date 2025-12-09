
CREATE DATABASE IF NOT EXISTS hospital;
USE hospital;

CREATE TABLE IF NOT EXISTS pacients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    cognoms VARCHAR(100) NOT NULL,
    dataNaixement DATE NOT NULL,
    dni VARCHAR(9) UNIQUE NOT NULL,
    poblacio VARCHAR(100) NOT NULL,
    cip VARCHAR(14) NOT NULL
);

-- valors per test
INSERT INTO pacients (nom, cognoms, dataNaixement, dni, poblacio, cip) VALUES
('Maria', 'Perez Lopez', '1990-03-15', '12345678A', 'Barcelona', 'CIP00000001'),
('Laura', 'Garcia Sanchez', '1985-07-22', '23456789B', 'Madrid', 'CIP00000002'),
('David', 'Martinez Ruiz', '1978-12-05', '34567890C', 'Valencia', 'CIP00000003'),
('Ana', 'Fernandez Gomez', '1992-09-30', '45678901D', 'Sevilla', 'CIP00000004'),
('Jorge', 'Santos Diaz', '1980-11-11', '56789012E', 'Bilbao', 'CIP00000005'),
('Elena', 'Torres Romero', '1995-01-20', '67890123F', 'Zaragoza', 'CIP00000006'),
('Pablo', 'Ramirez Morales', '1988-06-08', '78901234G', 'Malaga', 'CIP00000007'),
('Isabel', 'Vazquez Ortega', '1975-04-18', '89012345H', 'Alicante', 'CIP00000008'),
('Sergio', 'Jimenez Castro', '1993-08-25', '90123456J', 'Granada', 'CIP00000009'),
('Marta', 'Hernandez Medina', '1982-02-14', '01234567K', 'Valladolid', 'CIP00000010'),
('Carlos', 'Lopez Garcia', '1987-05-10', '11223344L', 'Sevilla', 'CIP00000011'),
('Sofia', 'Martinez Torres', '1991-09-12', '22334455M', 'Bilbao', 'CIP00000012'),
('Alberto', 'Fernandez Ruiz', '1983-11-03', '33445566N', 'Madrid', 'CIP00000013'),
('Lucia', 'Santos Romero', '1996-02-25', '44556677O', 'Barcelona', 'CIP00000014'),
('Fernando', 'Jimenez Lopez', '1979-07-18', '55667788P', 'Valencia', 'CIP00000015'),
('Patricia', 'Gomez Medina', '1984-12-30', '66778899Q', 'Zaragoza', 'CIP00000016'),
('Raul', 'Torres Sanchez', '1990-08-14', '77889900R', 'Málaga', 'CIP00000017'),
('Cristina', 'Vazquez Ortega', '1986-03-07', '88990011S', 'Alicante', 'CIP00000018'),
('Diego', 'Ramirez Morales', '1992-06-21', '99001122T', 'Granada', 'CIP00000019'),
('Natalia', 'Fernandez Diaz', '1988-01-15', '00112233U', 'Valladolid', 'CIP00000020');
