# Technical Interviews: The Good and Then The Bad & Ugly

I recently failed a technical interview in epic fashion and I didn't even care. (Well, that's not entirely true. I was bothered by the format of the interview, but I didn't mind that I failed the interview.) The following are my feelings about technical interviews.

## LeetCode-style Interviews
Many companies do [LeetCode](https://leetcode.com/)-style technical interviews. LeetCode interviews basically ask you to solve computer science trivia, technical puzzles, riddles, or brainteasers. They don't discuss real-world problems that a company is dealing with, so the questions are often not relevant to anything the company actually works on.

In this recent interview I had I was asked to work through two tasks: 

1. create a Python dictionary using a graph traversal algorithm
2. remove duplicates from a Python list and explain the time complexity

The problem with those questions is that...

* Graph traversals are almost never used in web development. I came across a scenario once while prototyping an app, but the graph traversal was replaced when I hooked the app up to a database and just performed my search queries against the database.
* Time complexity of an algorithm usually doesn't come into play unless you are doing something like processing a lot of data and the algorithm that was implemented is really slow. Most of the time a naive approach will work without any issues. If you do run into optimization issues, then you can deal with the time complexity of algorithms or whatever the issue is.

<p>You don't have to take my word for it, though. You can do a search for something like "<a href="https://www.google.com/search?q=how+often+are+graph+traversals+used+in+web+development" target="_blank">how often are graph traversals used in web development</a>" or "<a href="https://www.google.com/search?q=how+often+is+time+complexity+considered+in+web+development" target="_blank">how often is time complexity considered in web development</a>."</p>

Some actual skills used in web development are things like:

* setting up and configuring an app
* modeling data in your database
* running queries against your database
* writing frontend components and backend endpoints
* testing frontend components and backend endpoints
* debugging code
* error handling
* monitoring
* web app security (authentication and authorization)
* version control with Git and code reviews
* deployment with Docker/Kubernetes

And so on.

I will fail any LeetCode interview you throw at me because I don't spend my time studying concepts that I don't use in the real world. I have experience with a fair number of different web technologies, but I wasn't asked about any of those concepts. Nor was I given a code walk-through for anything related to web development.

**I think the real concern in doing LeetCode-style interviews is that even if I had aced the technical interview, no one would have known if I could do the work that is needed as a web developer. If they had asked me how to make a pizza my answer would have revealed nearly the same thing about my abilities to do web development as the LeetCode-style questions revealed.**

## My Personal Recommendations for Technical Interviews
The following are the types of interviews that I feel have been the most helpful, both for me to get an understanding of what the company was working on and for the company to get an understanding of my skills:

* A take-home assignment that provided a challenge similar to the kind of work the company was doing.
* Share a personal project that I have created (or create a project) and walk the interviewer through my code.
* Walk through some code in my public GitHub repos.
* A technical interview that asked questions that were relevant to the kind of work the company was doing.

Obviously, each of these approaches has their pros and cons. However, I think the first three can be really helpful in determining someone's skill set. You can also check out <a href="https://github.com/poteto/hiring-without-whiteboards" target="_blank">Hiring Without Whiteboards</a> for other ideas to improve the hiring process.

I have been on both sides of hiring and I understand it is difficult. Hopefully something I have shared will be helpful to you moving forward.
