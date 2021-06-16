1.What is the difference between Component and PureComponent? give an
example where it might break my app.

A: A pure component doesn't rerender if its state or the props are the same. 
To have the same behaviour in a Component we need to implement shouldComponentUpdate.

2.Context + ShouldComponentUpdate might be dangerous. Can think of
why is that?

A: When the context provider data changes, all components under it, which are subscibred to changes in the data 
will update. Using shoudlComponentUpdate won't work.

3.Describe 3 ways to pass information from a component to its PARENT.
A: 
1. Define a method in the parent component which updates its state, which we can pass to the child component through props.
After that on some event (for example a click) we can call the provided function in the props with whatever data we need.
2. Using context, we can have the context value used in the parent component. The child component which is also a consumer can update the context data,
resulting in update of the parent.
3. Using redux state management. We can have a redux state which is updated through the child component and presented in the parent component.

4.Give 2 ways to prevent components from re-rendering.
A: 
1. Use shouldComponentUpdate and granulary define when a component should be rerendered.
2. Wrap the component in a React.Memo 

5.What is a fragment and why do we need it? Give an example where it
might break my app.

A: Fragments are <> or React.Fragment. Sometimes we want to group some dom element together but don't want to add extra div's or nodes to the dom, 
so we can use fragments.
Example
<div>
    <div>1</div>
    <div>2</div>
</div>

can be transformed to
<>
    <div>1</div>
    <div>2</div>
</>

I had problems breaking my app from a style point of view - sometimes a style is supposed to update the first child element it sees but because fragments are not actual
dom elements the style is applied to a different node then we expect.

6.Give 3 examples of the HOC pattern.
A:
1. Example of HOC is the connect in Redux
2. Other example is when we want to show Login in multiple components if the user is no authenticated
`function WithAuth(Comp) {
  return function(isLoggedIn) {
    if (isLoggedIn) {
      return <Comp {...rest} />;
    } else {
      return <p>Please login first</p>;
    }
  };
}`

3. A loading component
function WithLoading(Comp) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) {
        return <Comp {...props} />;
    }
    return <SpinnerComponent/>;
  };

7. what's the difference in handling exceptions in promises, callbacks and
async...await.

A: for promises we can use the reject callback to catch an error. If we use async await we would need to await for the data and then try catch if there are exceptions.

8.How many arguments does setState take and why is it async.
A:
setState takes 2 arguments, the second one is a callback function which can update the state.
setState is async to better performance, because of it being async we can have multiple setStates and all of them are batched

9.List the steps needed to migrate a Class to Function Component.
A:
1. render method should be removed replaced by a return.
2. all methods should be converted to functions
3. we should remove `this` references
4. use hooks - for example replace state initalization in constructor with useState.
5. replace lifecylces methods with hooks - componentDidMount with useEffect(()=> ...,[]) etc.;

10.List a few ways styles can be used with components.
We can use inline styles, or classNames, we can have different className depending on state/props logic.

11. How to render an HTML string coming from the server.
A: we can use `dangerouslySetInnerHTML`.
