# User Stories checked:

1. created JSON file with mocked data for all users ✔️
2. used fetch API to retrieve said data ✔️
3. rendered users ✔️
4. implemented switch between layours using JS, both list view and grid view ✔️
5. Implement basic search ✔️
6. Users list Not Found Page is no longer a separate page ✔️
7. Implement User details HTML page ✔️
8. integrate JS to display user details HTML page ✔️
9. open user details page from the Page header ✔️
10. if user is not found, user details not found page should be displayed ✔️
11. header should be interactive ✔️
12. all the components (apart from support/edit/logout) should be interactive ✔️

# user stories: 1-3

- created json file with all user data
- used fetch to retrieve it asynchronously
- stored the users in global users array so every function can access it, avoiding async timing issues
- once fetched, calling initApp() which loops through users and calls renderUserBasicGrid() and renderUserBasicList()

# user story: 4

- created two containers gridView and listView
- I wasn't sure if I should have rendered different ones after clicking the view icons, so simply used toggleViews function

# user story: 5

- used Array.find() on users to find a match
- cleared input fields after search
- if match exists, switching window.location.href to userDetails.html pages, I really couldn't find better way

# user stories: 6,10

- originally I tried a trick to save original HTML into a variable, render not found page with js in its place, but that way I had to write restore function that redoes
  almost everything in js, attaching event handles and redeclaring variables
- instead, it's simply toggling hidden class
- togglePage(showPage) just toggles .hidden on both the main and the not found page

# user stories: 7-9

- grab id from URL params using URLSearchParams
- with it find user in users array
- rendered detailed HTML using displayDetailedUser(user)
- dynamic rendering of visa array, showing validity and marking expired ones. every user in data.json has same visa array, but functionality is there
- event listeners inside this are attached after the elements exist

# user stories: 9, 11-12

- each employee has data-id, clicking it triggers navigation to that user's details page
- also used event delication to have one event listener
  on whole container, if target matches employee class then switch happens
