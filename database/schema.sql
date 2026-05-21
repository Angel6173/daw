CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_id INT,
    modified_id INT
);

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    names VARCHAR(100) NOT NULL,
    fatherSurname VARCHAR(100) NOT NULL,
    motherSurname VARCHAR(100) NOT NULL,
    gender VARCHAR(20),
    address TEXT,
    phone VARCHAR(20),
    note TEXT,
    user_id INT,
    status VARCHAR(20) DEFAULT 'active',
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_id INT,
    modified_id INT,
    CONSTRAINT fk_students_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    courseName VARCHAR(150) NOT NULL,
    credits INT NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active',
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_id INT,
    modified_id INT
);

CREATE TABLE courses_students (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL,
    student_id INT NOT NULL,
    enrollmentDate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active',
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_id INT,
    modified_id INT,
    CONSTRAINT fk_cs_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    CONSTRAINT fk_cs_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    CONSTRAINT unique_course_student UNIQUE (course_id, student_id)
);

ALTER TABLE users ADD CONSTRAINT fk_users_created FOREIGN KEY (created_id) REFERENCES users(id);
ALTER TABLE users ADD CONSTRAINT fk_users_modified FOREIGN KEY (modified_id) REFERENCES users(id);

ALTER TABLE students ADD CONSTRAINT fk_students_created FOREIGN KEY (created_id) REFERENCES users(id);
ALTER TABLE students ADD CONSTRAINT fk_students_modified FOREIGN KEY (modified_id) REFERENCES users(id);

ALTER TABLE courses ADD CONSTRAINT fk_courses_created FOREIGN KEY (created_id) REFERENCES users(id);
ALTER TABLE courses ADD CONSTRAINT fk_courses_modified FOREIGN KEY (modified_id) REFERENCES users(id);

ALTER TABLE courses_students ADD CONSTRAINT fk_cs_created FOREIGN KEY (created_id) REFERENCES users(id);
ALTER TABLE courses_students ADD CONSTRAINT fk_cs_modified FOREIGN KEY (modified_id) REFERENCES users(id);