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

* A take-home assignment that provides a challenge similar to the kind of work the company does.
* Share a personal project that I have created (or create a project) and walk the interviewer through my code.
* Walk through some code in my public GitHub repos.
* A technical interview that asks questions that are relevant to the kind of work the company is doing.

Obviously, each of these approaches has their pros and cons. However, I think the first three can be really helpful in determining someone's skill set. You can also check out <a href="https://github.com/poteto/hiring-without-whiteboards" target="_blank">Hiring Without Whiteboards</a> for other ideas to improve the hiring process. It might even be beneficial to ask candidates if they have a preference for the type of technical interview they want to do. That way they can let you know what they are most comfortable with.


## Work With Your Strengths

I think it is important to understand your strengths and weaknesses so you can work with your strengths and minimize your weaknesses as much as possible. 

When I was in college I noticed that I had a really difficult time in a particular class. I worked really hard, studied my brains out, and still ended up with only a C+. I talked to my professor and described the challenges I was facing. He said that what I was describing reminded him of his son. He then asked me if I had been diagnosed with a learning disorder. That was the first time I had even considered the idea that I might have a learning disorder.

So I scheduled an appointment with a psychologist for a learning evaluation. I found out that technically I do not have a learning disorder, but that I am very close to being outside of the normal range for learning abilities. The challenge I face is that it takes me a long time to process information. You can imagine how that might be difficult when trying to follow a complex lecture in a college class or when studying complex concepts for tests.

How does this relate to technical interviews? I know that I am at a major disadvantage during live coding interviews (in comparison to many other job candidates) because I can't process problems and their solutions very quickly. It takes me longer than the next person to understand the code in a live coding interview and I have a hard time thinking through the problems and solutions&mdash;especially when someone is staring at me the whole time. However, since I am aware of this weakness that I have, I try to request take-home assignments instead of live coding interviews.

One of the <a href="https://adhocteam.us/join/" target="_blank">best interview experiences</a> that I have had was when I was given a take-home assignment followed by a live situational interview. I was able to take the time I needed to complete the take-home assignment, which was very helpful for me. Then during the live situational interview I was asked questions like, "Tell us about a time when you had to get buy-in from other members of your team on a technical decision. How did you handle it and what was the result?" I can respond to those types of questions quickly because I am simply recalling past experiences from memory. That interview format helped the company understand my skill level and if I would be a good fit for their culture. It also allowed me to work with my strengths while minimizing my weaknesses.

I also like that format because it would be hard for a candidate to cheat on a take-home assignment (e.g. get someone else to complete the assignment) and also pass the live situational interview. If you don't have the experience to complete the take-home assignment, then you probably won't have the experience to pass the situational interview with examples of things that you have actually done.

I have been on both sides of hiring and I understand it is difficult. Hopefully something I have shared will be helpful to you moving forward.
