# comment-chart

This project aims to provide a chart that can display data and allow users to
comment on specific parts of the data. This has been achieved using
React/Typescript for the frontend, and Python/FastAPI/SQLite3 for the backend.

This is my first React app built from the ground up, so I expect there a few
issues and oversights across the project. I am more experienced working with
Python/Flask but not FastAPI, however this project has converted me and I will
be using FastAPI more in the future. I have really enjoyed working on this
project. It has taught me a lot of new things whilst allowing me to show off my
skills. This repository reflects approximately 8-10 hours of active development
and 10-12 hours of learning.

# Running the Project

This project contains two separate apps, the frontend and backend. I suggest
running each part in its own terminal, or deploying them using docker.

## Backend

The backend is written in Python and has been tested with version 3.9.2. You
will also need Pip set up to install project dependencies. I recommend using
virtualenv and virtualenvwrapper to manage Python installations between
projects. If you use these tools then you can set up an environment for this
project with:

```
mkvirtualenv -p python3.9.2 comment-chart
workon comment-chart
```

All the backend commands should be run from within the `backend` directory:

```
cd backend
```

To install the project dependencies run:

```
pip install -r requirements.txt
```

To verify the backend is functional the test suite can then be run with: 

```
pytest
```

Finally the backend can be launched with:

```
uvicorn model.main:app
```

The API will then be available on port 8000, you can verify this is running by visiting http://localhost:8000/redoc

## Frontend

The frontend commands should be run from within the `frontend/chart-comment-app` directory:

```
cd frontend/chart-comment-app
```

To install the project dependencies run:

```
npm install
```

Finally the frontend can be launched with:

```
npm start
```

The frontend will then be available at http://localhost:3000/ 

If the backend isn't running the chart will be blank and the console will show
errors. This is intentional as the frontend is inherently dependent on the
backend.

# Planning

My first step was to lay out a rough structure plan for the project, this helped
to guide the development of the project and highlight which areas would need
more research and/or learning. After some quick research into React graph
libraries I found [React-Charts](https://react-charts.tanstack.com/) which I
started using, but ended up not being suitable for my needs. For the backend I
chose to use an in-memory SQLite3 database as the datastore, this is simply due
to my familiarity with the library. I decided to wrap the database in a custom
class, this is to allow the data store to be swapped out easily and to remove
data storage concerns from the API side of the backend. I chose to use pytest to
drive the test-driven approach of this project This was due to familiarity and
simplicity. 

This diagram reflects my initial sketch of the planned structure:

```
------------------------------------
Frontend    React    -> React Charts
                     get |   ^
------------------------------------
                         v   | return
Backend     Python 3 -> FastAPI <- tests (pytest?)
                           ^
                           v
                       data class
                           ^
                           v
                       sqlite3 db
```

Having completed this project I'm reasonably happy with this plan. I was slowed
down by my choice of chart library and the need to replace further down the
line. Due to my unfamiliarity with React and the well polished website for the
library I made some assumptions about the features it wold provide. I will
definitely learn from this experience.

# Frontend

I knew my React knowledge was a little lacking for this project so I dove into
some online tutorials and courses to bring myself up to speed. My previous React
experience has been modifying existing projects, so I was familiar with the
general structure and principles of React. This gave me a good head start into
learning the tech properly. 

Once I was comfortable I began building the frontend for this project. My first
task was to build the basic layout and components that I would need later on. I
decided not to focus too much on the styling aspect of the frontend. I am an
engineer not an artist, but I did want to demonstrate that I can manipulate CSS
to achieve a desired style. In a real world scenario I prefer to work closely
with the UI designers/clients to create a look and feel that they enjoy.

Initially I had desired to make the comment box a floating element that would
appear next to the selected data point. As the project developed I decided this
would take too long to implement and refine so the box was moved to a fixed
location below the chart. This is a feature that I would add to the next steps
of the project. Since the co-ordinates of the data points are available it
shouldn't be too challenging to either position the box using these, or use the
custom `renderDot` function to show the comments.

The issues I faced during this stage of the project mostly stemmed from my
initial chart library choice. I managed to Build most of the system using
React-Charts, however when I came to customize the data points to show the
comment counts I found it very challenging. This turned out to be due to the
opacity of the dots being hard-coded in the library when they aren't in the
hovered state. This made it impossible to control the appearance of the dots
unless the user is actively hovering over the dots which wouldn't meet the
requirements of this project. 

After doing some research I switched to [Recharts](https://recharts.org/). The
default styling of the charts was less appealing to me but the customization
options allows me to change this in future work if that is desired. I found this
library much easier to use overall and styling the dots was simple. I did
encounter an issue where the dots would sometimes not render until they were
refreshed by adding a comment. This [appears to be a
bug](https://github.com/recharts/recharts/issues/1426) in Recharts and I chose
to use the workaround that disables animation as this feature wasn't important
to me.

Overall I am pretty happy with the frontend that I have developed. It could
definitely be prettier but that was not a priority for me. As I mentioned before
I would have like to make the comment box float dynamically but this is a
feature better suited to a later release. There is a warning in the final
project that is complaining that React Hook is missing `data` as a dependency.
If this dependency is added however it causes a render loop and in my research I
found the most common solution was to add a flag to ignore this warning. This
didn't feel right to me so I decided to leave the warning in and add it to the
list of future fixes and features. 

# Backend

For the backend I followed TDD principles by writing out the test suite first.
This was pretty simple as I only had a few functions and modules to write. I was
impressed with FastAPI's pytest support which made testing the API a breeze.

Once the tests were written I implemented each function one at a time and
verified that the test for that function passed before moving on to the next.
This was a straightforward process as I have done it many times. I did have to
update some of the API tests as I got the expected data format and return codes
wrong.

I am very happy with my backend implementation. I enjoyed working with FastAPI
and I think separating the data storage into it's own class was a good idea,
which follows my own general design principles.

# Finishing Steps

Once the backend and frontend were finished I just had to connect the two by
replacing the mock `getData` and `getComments` functions with API calls. This
involved using React Hooks to set up the calls and handle the return data, as
well as setting up the headers on the backend to accept the connection. I did
have to adapt the data that the API sent as some of the field names were
slightly different between the frontend and backend (e.g. `comment-count` vs
`commentCount`). This stems from differing naming conventions in Python and
React which I decided to stick to as it reflects a real world scenario where you
will often have to re-format data to suit your needs. 

I am very satisfied by this stage of the project, it was very simple and issue
free due to the planning and development that lead up to it.

# Project Conclusion

This was a very enjoyable task for me and I hope to be able to do more projects
like this in the future. I was very impressed with FastAPI, I particularly like
the auto documentation that it generates and `openapi.json` file. I enjoyed
working with React, the component-ized structure allows very easy
compartmentalization and modularity. I usually prefer to document my code using
comments and systems like pydoc. However where possible I prefer the code to be
self descriptive by using appropriate variable and function names and sensible
structures. This project seems simple enough to understand for the average
React/Python developer so I did not feel the need to add extensive comments. The
API is one area that I think needs good documentation, however FastAPI provides
this automatically so there was no need to document this myself. I would call
the project a success, with a few areas for future development that I have
highlighted.