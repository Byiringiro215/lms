import { StatCardProps } from "../types/interfaces";
import { CheckoutProps } from "../types/interfaces";
import { TopBooksProps } from "../types/interfaces";
import { MemberProps } from "../types/interfaces";
import { CheckoutBookProps } from "../types/interfaces";
import { BookProps } from "../types/interfaces";
 export const CardData: StatCardProps[] = [
    {
        title: "Borrowed Books",
        value: 2405,
        percentage: 23
    },
    {
        title: "Returned Books",
        value: 783,
        percentage: -14
    },
    {
        title: "Overdue Books",
        value: 100,
        percentage: 10
    },
    {
        title: "Missing Books",
        value: 12,
        percentage: 11
    },
    {
        title: "Total Books",
        value: 32345,
        percentage: 11

    },
    {
        title: "Visitors",
        value: 1504,
        percentage: 3
    },
    {
        title: "New Members",
        value: 34,
        percentage: -10

    },
    {
        title: "Pending Fees",
        value: '$765',
        percentage: 10
    },
   
]
export const OverduesHistoryData = [
    {
      memberId: '1234567890',
      title: 'The Great Gatsby',
      isbn: '3254',
      dueDate: '2024-01-01',
      fine: '$10.00',
    },
    {
      memberId: '2345678901',
      title: 'To Kill a Mockingbird',
      isbn: '3254',
      dueDate: '2024-02-15',
      fine: '$7.50',
    },
    {
      memberId: '3456789012',
      title: 'Harry Potter ',
      isbn: '3254',
      dueDate: '2024-03-10',
      fine: '$12.00',
    },
    {
      memberId: '4567890123',
      title: 'Pride and Prejudice',
      isbn: '3254',
      dueDate: '2024-04-05',
      fine: '$5.00',
    },
    {
      memberId: '5678901234',
      title: 'Moby Dick',
      isbn: '3254',
      dueDate: '2024-05-20',
      fine: '$8.25',
    },
  ];

  export const CheckoutData:CheckoutProps[] = [
    {
        ID: '1234567890',
        ISBN: '3254',
        Title: 'The Great Gatsby',
        Author: 'F. Scott Fitzgerald',
        Member: 'John Doe',
        IssuedDate: '2024/01/01',
        ReturnDate: '2024/01/10',
      },
      {
        ID: '2345678901',
        ISBN: '9780',
        Title: 'To Kill a Mockingbird',
        Author: 'Harper Lee',
        Member: 'Jane Smith',
        IssuedDate: '2024/02/05',
        ReturnDate: '2024/02/15',
      },
      {
        ID: '3456789012',
        ISBN: '4935',
        Title: '1984',
        Author: 'George Orwell',
        Member: 'Alice Johnson',
        IssuedDate: '2024/03/10',
        ReturnDate: '2024/03/20',
      },
      {
        ID: '4123',
        ISBN: '9518',
        Title: 'Pride and Prejudice',
        Author: 'Jane Austen',
        Member: 'Bob Brown',
        IssuedDate: '2024/04/01',
        ReturnDate: '2024/04/11',
      },
      {
        ID: '0134',
        ISBN: '9786',
        Title: 'Moby Dick',
        Author: 'Herman Melville',
        Member: 'Carol White',
        IssuedDate: '2024/05/20',
        ReturnDate: '2024/05/30',
      },
      {
        ID: '6345',
        ISBN: '9088',
        Title: 'The Catcher in the Rye',
        Author: 'J.D. Salinger',
        Member: 'David Green',
        IssuedDate: '2024/06/15',
        ReturnDate: '2024/06/25',
      },
    
  ]

  export const TopBooksData:TopBooksProps[] = [
    {
        Title: 'The Great Gatsby',
        Author: 'F. Scott Fitzgerald',
        status: 'available'
    },
    {
        Title: 'To Kill a Mockingbird',
        Author: 'Harper Lee',
        status: 'borrowed',
      },
      {
        Title: '1984',
        Author: 'George Orwell',
        status: 'overdue',
      },
    
  ]

  export const MemberData:MemberProps[] = [
    {
        MemberID: '1234567890',
        RegisterID: '1234567890',
        Member: 'John Doe',
        Email: 'john.doe@example.com',
    },
    {
        MemberID: '1234567890',
        RegisterID: '1234567890',
        Member: 'Jane Smith',
        Email: 'jane.smith@example.com',
    },
    {
        MemberID: '1234567890',
        RegisterID: '1234567890',
        Member: 'Bob Brown',
        Email: 'bob.brown@example.com',
    },
    {
        MemberID: '1234567890',
        RegisterID: '1234567890',
        Member: 'Alice Johnson',
        Email: 'alice.johnson@example.com',
    },
    {
        MemberID: '1234567890',
        RegisterID: '1234567890',
        Member: 'Charlie Davis',
        Email: 'charlie.davis@example.com',
    },
    {
        MemberID: '1234567890',
        RegisterID: '1234567890',
        Member: 'David Green',
        Email: 'david.green@example.com',
    },
    {
        MemberID: '1234567890',
        RegisterID: '1234567890',
        Member: 'Eve White',
        Email: 'eve.white@example.com',
    },
    {
        MemberID: '1234567890',
        RegisterID: '1234567890',
        Member: 'Frank Black',
        Email: 'frank.black@example.com',
    },
    
    

  ]
  
  export const CheckoutBookData:CheckoutBookProps[] = [
    {
      MemberID: '1234567890',
      Member: 'John Doe',
      Title: 'The Great Gatsby',
      Author: 'F. Scott Fitzgerald',
      BorrowedDate: '2024/01/01',
      ReturnedDate: '2024/01/10',
      status: 'returned'
    },
    {
      MemberID: '1234567890',
      Member: 'Jane Smith',
      Title: 'To Kill a Mockingbird',
      Author: 'Harper Lee',
      BorrowedDate: '2024/02/05',
      ReturnedDate: '2024/02/15',
      status: 'pending'
    },
    {
      MemberID: '1234567890',
      Member: 'Bob Brown',
      Title: '1984',
      Author: 'George Orwell',
      BorrowedDate: '2024/03/10',
      ReturnedDate: '2024/03/20',
      status: 'pending'
    },
    {
      MemberID: '1234567890',
      Member: 'Alice Johnson',
      Title: 'Pride and Prejudice',
      Author: 'Jane Austen',
      BorrowedDate: '2024/04/01',
      ReturnedDate: '2024/04/11',
      status: 'pending'
    },
    {
      MemberID: '1234567890',
      Member: 'Charlie Davis',
      Title: 'Moby Dick',
      Author: 'Herman Melville',
      BorrowedDate: '2024/05/20',
      ReturnedDate: '2024/05/30',
      status: 'returned'
    },
    {
      MemberID: '1234567890',
      Member: 'David Green',
      Title: 'The Catcher in the Rye',
      Author: 'J.D. Salinger',
      BorrowedDate: '2024/06/15',
      ReturnedDate: '2024/06/25',
      status: 'returned'
    },
    {
      MemberID: '1234567890',
      Member: 'Eve White',
      Title: 'The Catcher in the Rye',
      Author: 'J.D. Salinger',
      BorrowedDate: '2024/07/15',
      ReturnedDate: '2024/07/25',
      status: 'pending'
    },
    {
      MemberID: '1234567890',
      Member: 'Frank Black',
      Title: 'The Catcher in the Rye',
      Author: 'J.D. Salinger',
      BorrowedDate: '2024/08/15',
      ReturnedDate: '2024/08/25',
      status: 'pending'
    },
    {
      MemberID: '1234567890',
      Member: 'Frank Black',
      Title: 'The Catcher in the Rye',
      Author: 'J.D. Salinger',
      BorrowedDate: '2024/08/15',
      ReturnedDate: '2024/08/25',
      status: 'returned'
    },
    {
      MemberID: '1234567890',
      Member: 'Frank Black',
      Title: 'The Catcher in the Rye',
      Author: 'J.D. Salinger',
      BorrowedDate: '2024/08/15',
      ReturnedDate: '2024/08/25',
      status: 'returned'
    },
    {
      MemberID: '1234567890',
      Member: 'Frank Black',
      Title: 'The Catcher in the Rye',
      Author: 'J.D. Salinger',
      BorrowedDate: '2024/08/15',
      ReturnedDate: '2024/08/25',
      status: 'pending'
    }
]

export const BookData:BookProps[] = [
  {
    ID: '9876543210',
    ISBN: '9781',
    Name: 'To Kill a Mockingbird',
    Category: 'Classic',
    Language: 'English',
    Status: 'available'
  },
  {
    ID: '2345678901',
    ISBN: '9782',
    Name: '1984',
    Category: 'Dystopian',
    Language: 'English',
    Status: 'borrowed'
  },
  {
    ID: '3456789012',
    ISBN: '9783',
    Name: 'One Hundred Years of Solitude',
    Category: 'Magical Realism',
    Language: 'Spanish',
    Status: 'lost'
  },
  {
    ID: '4567890123',
    ISBN: '9784',
    Name: 'The Alchemist',
    Category: 'Philosophical',
    Language: 'Portuguese',
    Status: 'available'
  },
  {
    ID: '5678901234',
    ISBN: '9785',
    Name: 'The Book Thief',
    Category: 'Historical',
    Language: 'English',
    Status: 'borrowed'
  },
  {
    ID: '6789012345',
    ISBN: '9786',
    Name: 'Crime and Punishment',
    Category: 'Psychological',
    Language: 'Russian',
    Status: 'available'
  },
  {
    ID: '7890123456',
    ISBN: '9787',
    Name: 'Pride and Prejudice',
    Category: 'Romance',
    Language: 'English',
    Status: 'lost'
  },
  {
    ID: '8901234567',
    ISBN: '9788',
    Name: 'Brave New World',
    Category: 'Science Fiction',
    Language: 'English',
    Status: 'available'
  },
  {
    ID: '9012345678',
    ISBN: '9789',
    Name: 'The Kite Runner',
    Category: 'Drama',
    Language: 'Persian',
    Status: 'borrowed'
  },
  {
    ID: '1122334455',
    ISBN: '9790',
    Name: 'Sapiens: A Brief History of Humankind',
    Category: 'Non-Fiction',
    Language: 'English',
    Status: 'available'
  }
 
]