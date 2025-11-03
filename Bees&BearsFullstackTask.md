# Take Home Task: Senior Fullstack Engineer

### Objective: 

To evaluate your technical skills, problem-solving abilities, and understanding of modern fullstack development in the context of a digital lending platform for green technologies.

### Task: 

Build a simple application for Bees & Bears where solar panel installers can create customers and generate loan offers with calculated monthly payments.

## Requirements:

### Backend (Python)

1. **Create a backend API**
   - Use Python, but choose whatever other frameworks, databases or technologies you want. Justify your choices.

2. **Implement at least the following API endpoints:**
   - `POST /customers`: Create a new customer
   - `GET /customers`: List all customers
   - `POST /loanoffers`: Create a loan offer (customer_id, loan_amount, interest_rate, term_months)
   - `GET /customers/{id}/loanoffers`: Get all loan offers for a customer

3. **Loan Payment Logic:**
   - Implement calculation logic that computes monthly payments using standard amortization formula

4. **Basic validation and error handling**

### Frontend (React)

5. **Create a React application**
   - Use your preferred setup
   - Choose your own styling approach

6. **Your frontend should facilitate the following:**
   - Create a customer
   - List customers
   - Create a loan offer for a customer
      - Display calculated monthly payment in real-time
   - Show loan offers for a given customer

7. **Documentation:**
   - Document your design choices, how to run your backend and frontend and any other relevant info.

## Evaluation Criteria:

- **Code Quality:** Clean, organized, maintainable code
- **Functionality:** Does it work end-to-end?
- **User Experience:** Is it intuitive and provides good feedback?
- **Testing:** Core logic is tested
- **Documentation:** Clear setup instructions

## Deliverables:

- Source code
- README with setup instructions

Push your solution to a public Git repository and send us the link.

This task is designed to be completed in approximately 4-5 hours. We don't expect it to be perfect. If you find yourself spending significantly more time, try to simplify your approach and document any assumptions or shortcuts you have taken in the README.


There are areas in which this challenge is vague, this is intentional. We expect you to be able to make decisions yourself about what to do. There is no singular correct approach to any software problem. 

If you do find yourself stuck, please reach out to us and we may be able to offer advice or assistance.

Good luck!