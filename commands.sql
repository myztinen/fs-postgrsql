CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);



insert into blogs (author, url, title, user_id) values ('Rahul Garg', 'https://martinfowler.com/articles/reduce-friction-ai/context-anchoring.html', 'Context Anchoring', 2);
insert into blogs (author, url, title, user_id) values ('Kief Morris', 'https://martinfowler.com/articles/exploring-gen-ai/humans-and-agents.html', 'Humans and Agents in Software Engineering Loops', 2);
insert into blogs (author, url, title, user_id) values ('David Heinemeier Hansson', 'https://world.hey.com/dhh/basecamp-becomes-agent-accessible-3ae6b949', 'Basecamp becomes agent accessible', 2);
insert into blogs (author, url, title, user_id) values ('Rahul Garg', 'https://martinfowler.com/articles/reduce-friction-ai/encoding-team-standards.html', 2);