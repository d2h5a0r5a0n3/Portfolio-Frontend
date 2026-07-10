import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillService } from '../service/skill-service/skill.service';
import { ExperienceService } from '../service/experience-service/experience.service';
import { EducationService } from '../service/education-service/education.service';
import { ProjectService } from '../service/project-service/project.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-seed-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seed-manager.component.html'
})
export class SeedManagerComponent {
  message = '';
  isLoading = false;

  constructor(
    private skillService: SkillService,
    private experienceService: ExperienceService,
    private educationService: EducationService,
    private projectService: ProjectService
  ) {}

  async clearAllData() {
    this.isLoading = true;
    this.message = 'Clearing database... Please wait.';
    try {
      // Clear Skills
      const skills = await firstValueFrom(this.skillService.getAllSkills());
      for (const s of skills) {
        if (s.id) await this.skillService.deleteSkill(s.id);
      }

      // Clear Experiences
      const experiences = await firstValueFrom(this.experienceService.getExperiences());
      for (const e of experiences) {
        if (e.id) await this.experienceService.deleteExperience(e.id);
      }

      // Clear Educations
      const educations = await firstValueFrom(this.educationService.getEducations());
      for (const ed of educations) {
        if (ed.id) await this.educationService.deleteEducation(ed.id);
      }

      // Clear Projects
      const projects = await firstValueFrom(this.projectService.getProjects());
      for (const p of projects) {
        if (p.id) await this.projectService.deleteProject(p.id);
      }

      this.message = 'All data cleared successfully! You can now dump the resume data.';
    } catch (e: any) {
      this.message = 'Error clearing data: ' + e.message;
    } finally {
      this.isLoading = false;
    }
  }

  async seedData() {
    this.isLoading = true;
    this.message = 'Dumping resume data... Please wait.';
    try {
      const skills = [
        {
          name: 'Java',
          skillCategory: 'BACKEND',
          proficiency: 'INTERMEDIATE',
          description: 'Extensive experience developing enterprise-grade backend applications using Core Java, Collections, Streams, Multithreading, Exception Handling, Generics, OOP principles, and modern Java features. Strong understanding of clean code, design patterns, and scalable application architecture.',
          icon: 'devicon-java-plain colored'
        },
        {
          name: 'Spring Boot',
          skillCategory: 'BACKEND',
          proficiency: 'INTERMEDIATE',
          description: 'Hands-on experience building RESTful APIs, implementing Spring Security, Spring Data JPA, Dependency Injection, Validation, Exception Handling, WebClient integrations, and scalable backend services for production healthcare applications.',
          icon: 'devicon-spring-original colored'
        },
        {
          name: 'Angular',
          skillCategory: 'FRONTEND',
          proficiency: 'INTERMEDIATE',
          description: 'Developing responsive enterprise web applications using Angular, Standalone Components, Signals, RxJS, Reactive Forms, Routing, Lazy Loading, Component Communication, and reusable UI architecture.',
          icon: 'devicon-angularjs-plain colored'
        },
        {
          name: 'TypeScript',
          skillCategory: 'FRONTEND',
          proficiency: 'BEGINNER',
          description: 'Building maintainable frontend applications using Interfaces, Generics, Utility Types, Async Programming, ES6+, Modules, Strong Typing, and Object-Oriented TypeScript.',
          icon: 'devicon-typescript-plain colored'
        },
        {
          name: 'Flowable',
          skillCategory: 'OTHER',
          proficiency: 'BEGINNER',
          description: 'Designed configurable workflow automation using BPMN, dynamic process definitions, approval workflows, business rules, and enterprise process orchestration.',
          icon: 'bi bi-diagram-3-fill text-info'
        },
        {
          name: 'Elasticsearch',
          skillCategory: 'DATABASE',
          proficiency: 'BEGINNER',
          description: 'Implemented full-text search, indexing strategies, query optimization, analyzers, aggregations, and search integrations for enterprise applications.',
          icon: 'devicon-elasticsearch-plain colored'
        },
        {
          name: 'Git',
          skillCategory: 'DEVOPS',
          proficiency: 'BEGINNER',
          description: 'Version control using Git with feature branching, pull requests, merge conflict resolution, release management, and collaborative software development workflows.',
          icon: 'devicon-git-plain colored'
        },
        {
          name: 'Maven',
          skillCategory: 'DEVOPS',
          proficiency: 'BEGINNER',
          description: 'Dependency management, multi-module project builds, plugin configuration, packaging, testing, and enterprise project automation using Apache Maven.',
          icon: 'devicon-apache-plain colored'
        },
        {
          name: 'GitLab',
          skillCategory: 'DEVOPS',
          proficiency: 'BEGINNER',
          description: 'Experience managing repositories, merge requests, CI/CD pipelines, issue tracking, code reviews, and deployment workflows using GitLab.',
          icon: 'devicon-gitlab-plain colored'
        },
        {
          name: 'Version Control',
          skillCategory: 'DEVOPS',
          proficiency: 'BEGINNER',
          description: 'Proficient in modern version control strategies, distributed source code management, conflict resolution, and collaborative team workflows.',
          icon: 'bi bi-diagram-2 text-primary'
        },
        {
          name: 'HTML',
          skillCategory: 'FRONTEND',
          proficiency: 'BEGINNER',
          description: 'Building semantic, accessible, and SEO-friendly web page structures using modern HTML5 standards and best practices.',
          icon: 'devicon-html5-plain colored'
        },
        {
          name: 'CSS',
          skillCategory: 'FRONTEND',
          proficiency: 'BEGINNER',
          description: 'Styling modern web applications using CSS3, Flexbox, CSS Grid, media queries, animations, variables, and responsive design principles.',
          icon: 'devicon-css3-plain colored'
        },
        {
          name: 'Docker',
          skillCategory: 'DEVOPS',
          proficiency: 'BEGINNER',
          description: 'Containerized Spring Boot and Angular applications using Docker and Docker Compose for local development and deployment consistency.',
          icon: 'devicon-docker-plain colored'
        },
        {
          name: 'Jenkins',
          skillCategory: 'DEVOPS',
          proficiency: 'BEGINNER',
          description: 'Configured and automated CI/CD pipelines, build processes, testing, and deployments using Jenkins.',
          icon: 'devicon-jenkins-plain colored'
        },
        {
          name: 'AWS EC2',
          skillCategory: 'DEVOPS',
          proficiency: 'BEGINNER',
          description: 'Provisioning, configuring, and managing cloud compute infrastructure using Amazon Web Services (AWS) EC2 instances.',
          icon: 'devicon-amazonwebservices-original colored'
        },
        {
          name: 'IntelliJ IDEA',
          skillCategory: 'OTHER',
          proficiency: 'BEGINNER',
          description: 'Extensive use of IntelliJ IDEA for Java/Spring Boot development, utilizing advanced debugging, refactoring, and database tooling.',
          icon: 'devicon-intellij-plain colored'
        },
        {
          name: 'JavaScript',
          skillCategory: 'FRONTEND',
          proficiency: 'BEGINNER',
          description: 'Strong knowledge of modern JavaScript including ES6+, DOM Manipulation, Closures, Promises, Async/Await, Event Loop, Functional Programming concepts, and browser APIs.',
          icon: 'devicon-javascript-plain colored'
        },
        {
          name: 'RxJS',
          skillCategory: 'FRONTEND',
          proficiency: 'BEGINNER',
          description: 'Working experience with Observables, Subjects, Operators, State Management, HTTP streams, Error Handling, and reactive programming within Angular applications.',
          icon: 'devicon-rxjs-plain colored'
        },
        {
          name: 'Spring Security',
          skillCategory: 'BACKEND',
          proficiency: 'BEGINNER',
          description: 'Implemented authentication, authorization, JWT-based security, role-based access control, and secured REST APIs using Spring Security.',
          icon: 'bi bi-shield-lock-fill text-success'
        },
        {
          name: 'REST APIs',
          skillCategory: 'BACKEND',
          proficiency: 'BEGINNER',
          description: 'Designed, implemented, documented, and maintained scalable RESTful services following best practices, validation, exception handling, pagination, filtering, and API versioning.',
          icon: 'bi bi-cloud-arrow-up-fill text-primary'
        },
        {
          name: 'PostgreSQL',
          skillCategory: 'DATABASE',
          proficiency: 'BEGINNER',
          description: 'Experienced in relational database design, SQL optimization, joins, indexing, normalization, query tuning, constraints, transactions, and PostgreSQL administration.',
          icon: 'devicon-postgresql-plain colored'
        },
        {
          name: 'Handlebars',
          skillCategory: 'FRONTEND',
          proficiency: 'BEGINNER',
          description: 'Built dynamic HTML templates and configurable document generation using Handlebars templating integrated with backend business logic.',
          icon: 'devicon-handlebars-original colored'
        },
        {
          name: 'JUnit & Mockito',
          skillCategory: 'BACKEND',
          proficiency: 'BEGINNER',
          description: 'Developed unit and integration tests using JUnit and Mockito, improving application reliability and reducing dependency on external services through mock-based testing.',
          icon: 'bi bi-check2-square text-success'
        }
      ];

      for (let i = 0; i < skills.length; i++) {
        await this.skillService.saveSkill({ ...skills[i], order: i } as any);
      }

      const experiences = [
        {
          role: 'Software Development Engineer I',
          company: 'Medblaze',
          jobType: 'FULL_TIME',
          location: 'Hyderabad',
          startDate: new Date('2025-06-01'),
          endDate: undefined,
          description: `
            <ul>
              <li>Working as a Full Stack Software Engineer developing scalable healthcare quality management applications using <strong>Java, Spring Boot, Angular, TypeScript, PostgreSQL, Elasticsearch, and Flowable BPM</strong>.</li>
              <li>Designed and developed a highly configurable <strong>Dynamic Form Template Module</strong> supporting SLA-driven form creation, reusable field configurations, validations, and workflow integration, reducing manual configuration effort by approximately <strong>30%</strong>.</li>
              <li>Built reusable backend services and RESTful APIs using Spring Boot following layered architecture, SOLID principles, and clean coding practices to improve maintainability and scalability.</li>
              <li>Implemented configurable workflow execution using <strong>Flowable BPM</strong>, enabling organizations to customize approval flows and business processes without requiring code changes.</li>
              <li>Worked extensively with <strong>Angular, TypeScript, RxJS, Bootstrap, and Reactive Forms</strong> to build responsive user interfaces, reusable components, dynamic forms, pagination, filtering, and search capabilities.</li>
              <li>Refactored multiple modules using the <strong>Factory Design Pattern</strong>, including Form View filtering, Role management, and Location management, reducing duplicate logic, improving maintainability, and simplifying future feature implementation.</li>
              <li>Converted Employee Master Excel upload functionality from static implementation to a centralized SLA-driven configuration model, significantly reducing manual intervention while improving processing efficiency and flexibility.</li>
              <li>Integrated third-party <strong>WhatsApp Business APIs</strong> using Spring WebClient, enabling automated notifications and messaging while implementing robust exception handling and retry mechanisms.</li>
              <li>Implemented mock-based unit testing using <strong>JUnit and Mockito</strong>, increasing test coverage and allowing independent testing without relying on external APIs.</li>
              <li>Developed an <strong>Assessment Accreditation Monitoring Dashboard</strong> providing real-time visibility into assessment progress, compliance tracking, and operational analytics for hospital accreditation processes.</li>
              <li>Implemented dynamic Incident ID generation using <strong>Handlebars templating</strong>, allowing configurable identifiers across multiple business units while improving traceability and reporting consistency.</li>
              <li>Worked with <strong>Elasticsearch</strong> to enhance search functionality, improve indexing performance, and deliver faster retrieval of configuration and business data.</li>
              <li>Developed backend validations, reusable service components, utility classes, DTO mappings, and optimized database interactions to improve application performance and maintainability.</li>
              <li>Collaborated with cross-functional teams including Business Analysts, QA Engineers, Product Owners, and Senior Developers throughout Agile development cycles, participating in sprint planning, backlog refinement, code reviews, testing, and production releases.</li>
              <li>Delivered more than <strong>15 production enhancement stories</strong>, bug fixes, and feature implementations while maintaining application stability and minimizing production defects.</li>
              <li>Maintained source code using <strong>Git</strong> and <strong>GitLab</strong>, following feature branching strategies, merge requests, code review practices, and CI/CD workflows.</li>
              <li>Worked on production issue analysis, debugging, root cause identification, log analysis, and performance improvements to ensure reliable enterprise application delivery.</li>
              <li>Continuously explored modern backend development practices, design patterns, and scalable software architecture while contributing to enterprise healthcare solutions.</li>
            </ul>
          `
        },
        {
          role: 'Software Engineer Intern',
          company: 'DBS Tech India',
          jobType: 'INTERNSHIP',
          location: 'Online / Hyderabad',
          startDate: new Date('2024-06-01'),
          endDate: new Date('2025-06-01'),
          description: `
            <ul>
              <li>Completed a one-year Software Engineering Internship working on enterprise software solutions within an Agile development environment.</li>
              <li>Contributed to the development of an <strong>Application Monitoring Tool</strong> used by development teams to monitor application health, identify runtime issues, and reduce debugging time by nearly <strong>30%</strong>.</li>
              <li>Participated in the development of a <strong>Retrofitting Tool</strong> designed to simplify migration, modernization, and enhancement of existing enterprise applications.</li>
              <li>Developed backend functionalities using Java while strengthening understanding of enterprise application architecture, object-oriented programming, and software engineering best practices.</li>
              <li>Collaborated closely with senior developers to analyze business requirements, implement features, fix defects, and improve overall application quality.</li>
              <li>Participated in Agile ceremonies including Sprint Planning, Daily Stand-ups, Sprint Reviews, Retrospectives, and backlog discussions.</li>
              <li>Worked with Git-based version control systems, following branching strategies and collaborative development workflows.</li>
              <li>Performed debugging, issue analysis, and root cause investigation to resolve production and development environment issues.</li>
              <li>Improved understanding of software development lifecycle (SDLC), code reviews, testing methodologies, deployment workflows, and enterprise coding standards.</li>
              <li>Gained valuable experience working in collaborative engineering teams while developing problem-solving, communication, and technical design skills.</li>
              <li>Built a strong foundation in writing maintainable code, understanding business requirements, and delivering reliable software within sprint timelines.</li>
            </ul>
          `
        }
      ];

      for (let i = 0; i < experiences.length; i++) {
        await this.experienceService.addExperience({ ...experiences[i], order: i } as any);
      }

      const educations = [
        {
          institution: 'Sreenidhi Institute of Science & Technology',
          degree: 'Bachelor of Technology',
          fieldOfStudy: 'Information Technology',
          startDate: new Date('2021-10-01'),
          endDate: new Date('2025-06-01'),
          description: `
            <ul>
              <li>Graduated with a <strong>CGPA of 9.13 / 10</strong>, consistently maintaining strong academic performance throughout the program.</li>
              <li>Built a solid foundation in <strong>Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, Software Engineering, Compiler Design, and Web Technologies</strong>.</li>
              <li>Developed multiple full-stack applications using <strong>Java, Spring Boot, Angular, PostgreSQL, REST APIs, and TypeScript</strong> as part of academic and personal projects.</li>
              <li>Strengthened analytical and problem-solving skills through continuous practice of Data Structures and Algorithms on coding platforms.</li>
              <li>Participated in technical workshops, hackathons, coding competitions, and collaborative software development activities.</li>
              <li>Actively explored modern backend technologies including Spring Ecosystem, Microservices, Docker, Elasticsearch, and Cloud Computing beyond the academic curriculum.</li>
              <li>Balanced academics with internships and real-world software development experience, allowing practical application of classroom concepts in enterprise projects.</li>
            </ul>
          `
        },
        {
          institution: 'Alphores Junior College',
          degree: 'Intermediate (Class XII)',
          fieldOfStudy: 'Science & Mathematics',
          startDate: new Date('2019-06-01'),
          endDate: new Date('2021-03-01'),
          description: `
            <ul>
              <li>Completed pre-university education with an outstanding <strong>Percentage of 97.6%</strong>.</li>
              <li>Built a strong academic foundation in physical sciences and mathematics, preparing for engineering studies.</li>
            </ul>
          `
        },
        {
          institution: 'Trinity Secondary Model School',
          degree: 'SSC (Class X)',
          fieldOfStudy: 'General Education',
          startDate: new Date('2018-06-01'),
          endDate: new Date('2019-04-01'),
          description: `
            <ul>
              <li>Graduated with a <strong>CGPA of 9.5 / 10</strong>.</li>
              <li>Developed an early interest in analytical thinking and problem-solving.</li>
            </ul>
          `
        }
      ];

      for (let i = 0; i < educations.length; i++) {
        await this.educationService.addEducation({ ...educations[i], order: i } as any);
      }

      const projects = [
        {
          title: 'Personal Developer Portfolio',
          techStack: 'Angular, TypeScript, Bootstrap, HTML5, CSS3, Firebase (Firestore & Authentication)',
          description: `
            Designed and developed a responsive, dynamic personal portfolio web application to showcase professional experience, education, projects, and skills.
            <br><br>
            <ul>
              <li>Built a modern, single-page application (SPA) using Angular with a standalone component architecture and reactive programming (RxJS).</li>
              <li>Designed a sleek, responsive user interface using Bootstrap 5, custom CSS, and interactive elements including a light/dark theme toggle.</li>
              <li>Integrated Firebase as a serverless backend to manage application data securely and efficiently in real-time.</li>
              <li>Utilized Cloud Firestore to store and dynamically serve portfolio content, eliminating the need for hardcoded data.</li>
              <li>Implemented secure Google Authentication via Firebase Auth for admin access and content management.</li>
              <li>Developed a robust data-seeding mechanism to effortlessly manage and populate Firestore collections from the frontend.</li>
            </ul>
          `,
          github: 'https://github.com/d2h5a0r5a0n3/Portfolio-UI',
          startDate: new Date('2026-06-01'),
          endDate: undefined
        },
        {
          title: 'Split Work - Intelligent Task Management Platform',
          techStack: 'Java, Spring Boot, Angular, TypeScript, PostgreSQL, REST API, JWT, Docker, Git',
          description: `
            Developed a full-stack enterprise task management platform designed to automate repetitive work allocation, improve collaboration, and ensure fair workload distribution among team members.
            <br><br>
            <ul>
              <li>Designed scalable RESTful APIs using Spring Boot following layered architecture and SOLID principles.</li>
              <li>Built a responsive Angular frontend with reusable components, standalone architecture, routing, pagination, filtering, search, and modern UI design.</li>
              <li>Implemented secure authentication and authorization using JWT-based security.</li>
              <li>Designed relational database schema using PostgreSQL with optimized queries and entity relationships.</li>
              <li>Developed configurable task assignment logic to ensure fair workload distribution among team members.</li>
              <li>Implemented task lifecycle management including creation, assignment, status tracking, priority management, and progress monitoring.</li>
              <li>Integrated notification mechanisms for improved collaboration and real-time task updates.</li>
              <li>Focused on clean architecture, reusable services, modular frontend design, validation, exception handling, and scalable backend implementation.</li>
              <li>Containerized backend services using Docker to simplify local development and deployment.</li>
              <li>Applied Git-based collaborative development practices and followed modern software engineering standards throughout development.</li>
            </ul>
          `,
          github: '',
          startDate: new Date('2025-09-01'),
          endDate: undefined
        },
        {
          title: 'Product Enhancement Hackathon - Agentic AI',
          techStack: 'Agentic AI, LLM, Prompt Engineering, Knowledge Base',
          description: `
            Participated in an internal Product Enhancement Hackathon focused on leveraging Generative AI to improve enterprise productivity.
            <br><br>
            <ul>
              <li>Designed an Agentic AI prototype capable of utilizing an existing organizational knowledge base to answer user queries intelligently.</li>
              <li>Explored Retrieval-Augmented Generation (RAG) concepts for context-aware information retrieval.</li>
              <li>Worked on prompt engineering techniques to improve response accuracy and relevance.</li>
              <li>Focused on reducing manual search effort by enabling conversational access to organizational documentation.</li>
              <li>Collaborated closely with team members to brainstorm ideas, build prototypes, and demonstrate the solution within strict hackathon timelines.</li>
            </ul>
          `,
          github: '',
          startDate: new Date('2025-01-01'),
          endDate: new Date('2025-01-01')
        },
        {
          title: 'Spring Vlogs - Social Media App',
          techStack: 'Java, Spring Boot, MySQL, JSP, Thymeleaf, JavaScript, Jenkins, Docker, Terraform, AWS',
          description: `
            Designed and developed a Twitter-inspired microblogging platform from scratch.
            <br><br>
            <ul>
              <li>Implemented secure authentication and authorization with user registration and login.</li>
              <li>Developed complete CRUD functionality for creating, editing, deleting, and managing posts.</li>
              <li>Built responsive frontend pages using JSP, HTML, CSS, JavaScript, and Thymeleaf.</li>
              <li>Designed relational database schema using MySQL with proper entity relationships.</li>
              <li>Containerized the application using Docker and automated deployments using Jenkins CI/CD pipelines.</li>
              <li>Provisioned cloud infrastructure using Terraform while exploring AWS deployment concepts (EC2).</li>
            </ul>
          `,
          github: 'https://github.com/d2h5a0r5a0n3/SpringVlogs',
          startDate: new Date('2023-11-01'),
          endDate: new Date('2024-01-01')
        },
        {
          title: 'TODO List Web App',
          techStack: 'Java, Spring Boot, JSP, MySQL, Spring Data JPA',
          description: `
            Designed a web-based task manager that enables users to create, update, and delete personal tasks with intuitive UI using JSP.
            <br><br>
            <ul>
              <li>Built backend using Spring Boot and integrated MySQL with Spring Data JPA for seamless ORM and query handling.</li>
              <li>Implemented MVC architecture, form validation, and user-friendly error handling for a smooth user experience.</li>
              <li>Integrated CRUD operations and dynamic UI using JSP and Spring Data JPA.</li>
            </ul>
          `,
          github: 'https://github.com/d2h5a0r5a0n3/Todo-Webapp',
          startDate: new Date('2024-10-01'),
          endDate: new Date('2024-11-01')
        },
        {
          title: 'Library Management System',
          techStack: 'Java, Swing, JDBC, MySQL',
          description: `
            Developed a Java-based desktop application to manage library operations, including book, borrowing, returns, and user administration.
            <br><br>
            <ul>
              <li>Implemented a dynamic user interface using Java Swing, with real-time database updates through JDBC connectivity to MySQL.</li>
              <li>Built features such as admin login, book search, borrower history, and due-date tracking.</li>
              <li>Gained practical experience in desktop application development and persistent data handling using relational databases.</li>
            </ul>
          `,
          github: 'https://github.com/d2h5a0r5a0n3/Library-Management-System/',
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-04-01')
        }
      ];

      for (let i = 0; i < projects.length; i++) {
        await this.projectService.addProject({ ...projects[i], order: i } as any);
      }

      this.message = 'Data dumped successfully! Navigate to your other pages to see it.';
    } catch (e: any) {
      this.message = 'Error dumping data: ' + e.message;
    } finally {
      this.isLoading = false;
    }
  }
}
