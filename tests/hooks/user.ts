// import { renderHook, act } from "@testing-library/react-hooks";
// import { useUser, getUserPreferencesDocument } from "../../src/hooks/user";

// describe("Firebase User", () => {
//   const email = "test@test.com";
//   const password = "testtest";
//   const { result } = renderHook(() => useUser());

//   beforeAll(async (done) => {
//     try {
//       await act(async () => await result.current.signIn(email, password));
//       done();
//     } catch (e) {
//       console.log("BEFORE ALL ERROR = ", e);
//       expect(e).toBeFalsy();
//     }
//   });

//   afterAll(async (done) => {
//     try {
//       await act(async () => await result.current.signOut());
//       done();
//     } catch (e) {
//       console.log("AFTER ALL ERROR = ", e);
//       expect(e).toBeFalsy();
//     }
//   });

//   it("get user preferences", async (done) => {
//     try {
//       const doc = await getUserPreferencesDocument(
//         result.current.user.user_id
//       ).get();
//       console.log("DOC = ", doc);
//       done();
//     } catch (e) {
//       console.log("ERROR = ", e);
//       expect(e).toBeFalsy();
//     }
//   });
// });
