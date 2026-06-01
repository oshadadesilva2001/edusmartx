CREATE DATABASE IF NOT EXISTS edusmartx_db;
USE edusmartx_db;

-- Users (base table for all user types)
CREATE TABLE IF NOT EXISTS Users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'instructor', 'admin') NOT NULL
);

-- Students (subtype of Users)
CREATE TABLE IF NOT EXISTS Students (
  user_id INT PRIMARY KEY,
  reg_date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Instructors (subtype of Users)
CREATE TABLE IF NOT EXISTS Instructors (
  user_id INT PRIMARY KEY,
  specialization VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Courses
CREATE TABLE IF NOT EXISTS Courses (
  course_id INT AUTO_INCREMENT PRIMARY KEY,
  course_name VARCHAR(255) NOT NULL,
  instructor_id INT NOT NULL,
  FOREIGN KEY (instructor_id) REFERENCES Instructors(user_id)
);

-- Lessons
CREATE TABLE IF NOT EXISTS Lessons (
  les_id INT AUTO_INCREMENT PRIMARY KEY,
  les_name VARCHAR(255) NOT NULL,
  course_id INT NOT NULL,
  FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

-- Quizzes
CREATE TABLE IF NOT EXISTS Quizzes (
  q_id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

-- Enrollment (composite PK)
CREATE TABLE IF NOT EXISTS Enrollment (
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  enr_date DATE NOT NULL,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES Students(user_id),
  FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

-- Attempts (CHECK prevents negative marks)
CREATE TABLE IF NOT EXISTS Attempts (
  attempt_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  q_id INT NOT NULL,
  marks DECIMAL(5,2) NOT NULL CHECK (marks >= 0),
  FOREIGN KEY (student_id) REFERENCES Students(user_id),
  FOREIGN KEY (q_id) REFERENCES Quizzes(q_id)
);

-- Recommendations
CREATE TABLE IF NOT EXISTS Recommendations (
  rec_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  reason VARCHAR(500) NOT NULL,
  FOREIGN KEY (student_id) REFERENCES Students(user_id)
);

-- Course Categories
CREATE TABLE IF NOT EXISTS course_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Course-Category mapping
CREATE TABLE IF NOT EXISTS course_category_map (
  course_id INT NOT NULL,
  category_id INT NOT NULL,
  PRIMARY KEY (course_id, category_id),
  FOREIGN KEY (course_id) REFERENCES Courses(course_id),
  FOREIGN KEY (category_id) REFERENCES course_categories(id)
);

-- Quiz Questions
CREATE TABLE IF NOT EXISTS quiz_questions (
  question_id INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id INT NOT NULL,
  question_text VARCHAR(500) NOT NULL,
  question_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (quiz_id) REFERENCES Quizzes(q_id)
);

-- Quiz Options
CREATE TABLE IF NOT EXISTS quiz_options (
  option_id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT NOT NULL,
  option_text VARCHAR(500) NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE,
  option_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (question_id) REFERENCES quiz_questions(question_id)
);

-- Student Quiz Answers
CREATE TABLE IF NOT EXISTS student_quiz_answers (
  student_id INT NOT NULL,
  question_id INT NOT NULL,
  selected_option_id INT,
  PRIMARY KEY (student_id, question_id),
  FOREIGN KEY (student_id) REFERENCES Students(user_id),
  FOREIGN KEY (question_id) REFERENCES quiz_questions(question_id),
  FOREIGN KEY (selected_option_id) REFERENCES quiz_options(option_id)
);

-- Student Activity Log
CREATE TABLE IF NOT EXISTS student_activity_log (
  activity_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  activity_type ENUM('quiz', 'enrollment', 'achievement', 'progress') NOT NULL,
  description VARCHAR(500) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES Students(user_id)
);

-- Seed data
INSERT IGNORE INTO Users (user_id, name, email, password, role) VALUES
  (1, 'Oshada', 'oshada@edusmartx.com', 'password123', 'student'),
  (2, 'Isuri', 'isuri@edusmartx.com', 'password123', 'student'),
  (3, 'Pavani', 'pavani@edusmartx.com', 'password123', 'instructor'),
  (4, 'Admin User', 'admin@edusmartx.com', 'admin123', 'admin');

INSERT IGNORE INTO Students (user_id, reg_date) VALUES
  (1, '2025-01-15'),
  (2, '2025-02-01');

INSERT IGNORE INTO Instructors (user_id, specialization) VALUES
  (3, 'Machine Learning');

INSERT IGNORE INTO Courses (course_id, course_name, instructor_id) VALUES
  (1, 'Introduction to Machine Learning', 3),
  (2, 'Deep Learning Fundamentals', 3);

INSERT IGNORE INTO Lessons (les_id, les_name, course_id) VALUES
  (1, 'What is Machine Learning?', 1),
  (2, 'Supervised vs Unsupervised Learning', 1),
  (3, 'Neural Network Basics', 2),
  (4, 'Backpropagation Explained', 2);

INSERT IGNORE INTO Quizzes (q_id, course_id) VALUES
  (1, 1),
  (2, 1),
  (3, 2);

INSERT IGNORE INTO Enrollment (student_id, course_id, enr_date) VALUES
  (1, 1, '2025-01-20'),
  (1, 2, '2025-02-10'),
  (2, 1, '2025-02-05');

INSERT IGNORE INTO Attempts (attempt_id, student_id, q_id, marks) VALUES
  (1, 1, 1, 85.00),
  (2, 1, 2, 72.50),
  (3, 1, 3, 91.00),
  (4, 2, 1, 65.00),
  (5, 2, 2, 45.00);

INSERT IGNORE INTO Recommendations (rec_id, student_id, reason) VALUES
  (1, 1, 'Review regularization techniques to improve generalization.'),
  (2, 1, 'Join the Advanced ML study group for collaborative learning.'),
  (3, 2, 'Focus on fundamentals: revisit linear algebra and probability.'),
  (4, 2, 'Attempt the practice quizzes for supervised learning before the exam.');

-- Seed new tables
INSERT IGNORE INTO course_categories (id, name) VALUES
  (1, 'Data Science'),
  (2, 'Mathematics'),
  (3, 'Computer Science'),
  (4, 'Science'),
  (5, 'Humanities'),
  (6, 'Business');

INSERT IGNORE INTO course_category_map (course_id, category_id) VALUES
  (1, 1),
  (2, 1);

INSERT IGNORE INTO quiz_questions (question_id, quiz_id, question_text, question_order) VALUES
  (1, 1, 'What is the primary goal of supervised learning?', 1),
  (2, 1, 'Which of the following is an example of unsupervised learning?', 2),
  (3, 1, 'What does overfitting mean in machine learning?', 3);

INSERT IGNORE INTO quiz_options (option_id, question_id, option_text, is_correct, option_order) VALUES
  (1, 1, 'To learn from labeled data and make predictions', TRUE, 1),
  (2, 1, 'To find hidden patterns without labels', FALSE, 2),
  (3, 1, 'To maximize reward in an environment', FALSE, 3),
  (4, 1, 'To reduce dimensionality of data', FALSE, 4),
  (5, 2, 'Clustering customer segments', TRUE, 1),
  (6, 2, 'Predicting house prices from features', FALSE, 2),
  (7, 2, 'Classifying email as spam or not', FALSE, 3),
  (8, 2, 'Recognizing handwritten digits', FALSE, 4),
  (9, 3, 'The model performs well on training data but poorly on new data', TRUE, 1),
  (10, 3, 'The model has too few parameters to learn', FALSE, 2),
  (11, 3, 'The model trains too quickly', FALSE, 3),
  (12, 3, 'The model uses too much memory', FALSE, 4);

INSERT IGNORE INTO student_activity_log (activity_id, student_id, activity_type, description) VALUES
  (1, 1, 'quiz', 'Completed Machine Learning quiz 1 with score 85%'),
  (2, 1, 'enrollment', 'Enrolled in Deep Learning Fundamentals'),
  (3, 1, 'achievement', 'Earned "Quick Learner" badge for completing 5 lessons'),
  (4, 2, 'quiz', 'Completed Machine Learning quiz 1 with score 65%'),
  (5, 2, 'progress', 'Reached 50% completion in Introduction to Machine Learning');
