### react-google-like-search-bar
##Building a search bar look like google

---

Assignment
Create a search bar. User should be able to search for a country by name:

use https://github.com/samayo/country-json

use https://github.com/samayo/country-json/blob/master/src/country-by-capital-city.json

you can use mock server to manage this

use throttling to manage the search bar (create a useEffect) (we will discuss this later in a PSC,
so dont worry if you do not get this part )

##create a drop down below the search bar

it should provide partial matches or matches of the search against the list of countries
use a simple substring checklimit the responses to 5 on drop down (in view, use css to hide)
on hover you should highlight
on bring up a modal and show the country (as title) and capital as body

---


Example
Use Hooks
show an activity indicator on the right when the query is happening (can add fake delay to
emulate an api)
other features
use arrow keys to let user move from top to bottom
if user reaches the 6th selection, then the results should be from 2,3,4,5,6. 1 is hidden
use throttling
by pressing enter or onClick you should move to a page (dynamic routing) and show that data
with a back button
