import Book from "./components/Book/book";
import { BookType, Purchase, User } from "./types/types";
import { getAllBooks } from "./lib/microcms/client";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./lib/next-auth/options";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Home() {
  // 状態を管理するためのuseStateフック
  // const [books, setBooks] = useState([]);
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;

  const { contents } = await getAllBooks();

  let purchaseBookIds: string[];

  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`
    );
    const purchasesData = await response.json();
    const purchasedIds = purchasesData.map(
      (purchase: Purchase) => purchase.bookId
    );

    return (
      <>
        <main className="flex flex-wrap justify-center items-center md:mt-20 mt-20">
          <h2 className="text-center w-full font-bold text-3xl mb-2">
            Book Commerce
          </h2>
          {contents.map((book: BookType) => (
            <Book
              key={book.id}
              book={book}
              // user={user}
              isPurchased={purchasedIds.includes(book.id)}
            />
          ))}
        </main>
      </>
    );
  }

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-20 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        {contents.map((book: BookType) => (
          <Book
            key={book.id}
            book={book}
            // user={user}
            isPurchased={false}
          />
        ))}
      </main>
    </>
  );
}
