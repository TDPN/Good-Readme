const inquirer = require('inquirer');
const util = require('util');
const fs = require('fs');
const api = require('./api')

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
 inquirer
 .prompt([
    {
      type: 'input',
      name: 'gitName',
      message: 'What is your GitHub user name?'
    },
    {
      type: 'input',
      name: 'title',
      message: 'What is the Project Title?'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Describe your project.'
    },
    {
      type: 'input',
      name: 'instructions',
      message: 'Briefly explain and showcase what your application does.'
    },
    {
      type: 'input',
      name: 'licenses',
      message: 'Please provide license information.'
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Provide details on your tests and how to run them.'
    },
    {
      type: 'input',
      name: 'acknowledgments',
      message: 'Are there any acknowledgements you like to give?'
    }

  ]);
}

async function generateREADME(answers) {
  const fullData = await api.getUser(answers);


  return ` 
      
  # ${answers.title}
  
  ${answers.description}
  
  <!-- Animated Gif Here -->
  
  ## Usage
  
  ${answers.instructions}
  
  
  ## Running the tests
  
  ${answers.tests}
  
  ## Author
  
  #${fullData.data.name} 
  <img src="${fullData.data.avatar_url}" alt="Author Picture" width="150">
  Git: ${fullData.data.login} | email: ${fullData.data.email}
  
  ## License
  
  ${answers.licenses}
  
  ## Acknowledgments
  
  ${answers.acknowledgements}
  
  ## Badges
      
      `;
}

async function init() {
  try {
    const answers = await promptUser();

    const text = await generateREADME(answers);

    await writeFileAsync("README.md", text);

    console.log("Successfully wrote to README.md");
  } catch (err) {
    console.log(err);
  }
}
// Initiates process.
init();