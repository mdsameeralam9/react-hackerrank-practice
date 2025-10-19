# What is:

## Code Splitting (or Bundle Splitting)
 - Code splitting is a technique that breaks a large JavaScript bundle or code or file into smaller  bundle or code or file, dynamically loadable chunks. This reduces the initial amount of code the browser needs to download and parse, which improves an application's performance, particularly the initial page load time. The chunks are then loaded on demand, using dynamic import() with React.lazy and React.Suspense

  
  ##### a. Route Splitting
    - Route splitting is a common strategy that creates a separate code chunk for each route in a single-page application (SPA). 
    - Method: When a user navigates to a new page, the code for that page is loaded on demand. It ensures that users only download the code relevant to the specific page they are visiting, not the entire application. You can use React.lazy() and <Suspense> to load a component only when its route is activated. 
  
  ##### b. Component-Based Splitting
   - Component-based splitting, also known as component-level splitting, breaks down code into chunks at the component level rather than just the route level. This technique loads a component and its dependencies only when it is actually needed and rendered. It is most useful for components that are not always visible or used, such as a modal dialog, a complex form, or a third-party widget.


  #### c. Import on Interaction
   - This technique delays loading a component or asset until the user interacts with a specific part of the page. The code is loaded in response to an event like a button click, a mouse hover, or a form submission. It prevents the initial bundle from including code for features that most users may never use, which significantly improves the initial Time to Interactive (TTI).
   - Example: A chat widget that only loads its hefty code when a user clicks the "Open Chat" button
  
  #### d. Import on Visibility
   - Import on visibility (or lazy loading) loads a component or resource only when it enters the user's viewport (i.e., becomes visible on the screen). This is typically implemented using the Intersection Observer API to detect when an element scrolls into view.
   - Benefit: It is highly effective for "below-the-fold" content—components or images located lower down on a page that the user may never scroll to. This reduces initial load times and conserves bandwidth.
   - Example: A photo gallery that is far down a webpage will not have its images loaded until the user scrolls them into the viewing area.

# Why we need

# How to implement