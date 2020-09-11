// MVP
/** Board
 * Four colored squares - 4 divs
 * Instructions senction
 * Score section
 * Title
 * Let's play Button
 * Reset Button
 */

 /** Random, repeated sequence of colors flashing
  * Vars - 
  *     colors
  *     list of colors selected
  *     index
  *     colors presented
  *     correct items
  *     click counter
  /**  funcs - */
  /**    random color selector
  *         push to end of color selector */
  /**    change apearance of the appropriate square
  *         use CSS to half tint lighter
  *         bonus, use a circle gradient in middle of the square */
 /**     check for wins 
  *         compare list of colors presented to list of colors clicked
  *         clear list if it is the same
  *         add 1 to the sucessful play back feature
  *         add one to click counter */
  /**
  * event listeners
  *     Clicks on the buttons (apply to whole board)
  *     Add to the list of user selected
  *     also change styling of the board
  *     after each click check for wins 
  *     
  * Intervals
  *     Presentation: use it to present the colors on the list in a slow but steady pace
  *     Color flash: two toggles to flash on and off
  * 
  * to solve -
  *     Find a way to compare (while loop?) the number of user clicks (on buttons) to the length of the 
  *         presented colors. Once the clicks on button count equals the length of the color list, quit
  *         checking the two lists and run the function again
  */