
import './App.css'
import ButtonClickCounter from './Day05/AffternoonPractice/ButtonClickCounter'
import CheckboxToggle from './Day05/AffternoonPractice/CheckboxToggle'
import DoubleClickMessage from './Day05/AffternoonPractice/DoubleClickMessage'
import DropdownSelection from './Day05/AffternoonPractice/DropdownSelection'
import FormSubmissionAlert from './Day05/AffternoonPractice/FormSubmissionAlert'
import HoverHighlight from './Day05/AffternoonPractice/HoverHighlight'
import InputFieldTracker from './Day05/AffternoonPractice/InputFieldTracker'
import KeyPressDisplay from './Day05/AffternoonPractice/KeyPressDisplay'
import SearchFilter from './Day05/AffternoonPractice/SearchFilter'
import ToggleSwitch from './Day05/AffternoonPractice/ToggleSwitch'

function App() {

  return (
    <>
      <div className="wrapper">
        <h3>Exercise 1: Button Click Counter</h3>
        <ButtonClickCounter />
      </div>

      <div className="wrapper">
        <h3>Exercise 2: Input Field Tracker</h3>
        <InputFieldTracker />
      </div>

      <div className="wrapper">
        <h3>Exercise 3: Toggle Switch</h3>
        <ToggleSwitch />
      </div>

      <div className="wrapper">
        <h3>Exercise 4: Hover Highlight</h3>
        <HoverHighlight />
      </div>

      <div className="wrapper">
        <h3>Exercise 5: Form Submission Alert</h3>
        <FormSubmissionAlert />
      </div>

      <div className="wrapper">
        <h3>Exercise 6: Key Press Display</h3>
        <KeyPressDisplay />
      </div>

      <div className="wrapper">
        <h3>Exercise 7: Double Click Message</h3>
        <DoubleClickMessage />
      </div>

      <div className="wrapper">
        <h3>Exercise 8: Dropdown Selection</h3>
        <DropdownSelection />
      </div>

      <div className="wrapper">
        <h3>Exercise 9: Checkbox Toggle</h3>
        <CheckboxToggle />
      </div>

      <div className="wrapper">
        <h3>Exercise 10: Search Filter</h3>
        <SearchFilter />
      </div>
    </>
  )
}

export default App
