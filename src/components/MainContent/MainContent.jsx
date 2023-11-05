import CommentBox from "./Comment/CommentBox";
export default function MainContent() {
  return (
    <main className="ml-[3.5rem]  grid min-h-screen place-content-center py-4 font-rubik transition-all md:ml-0">
      <h1 className="sr-only">Comment Section</h1>
      <CommentBox />
    </main>
  );
}
