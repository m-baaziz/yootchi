import fs from "fs";
import path from "path";
import * as firebase from "@firebase/rules-unit-testing";

const RULES_PATH = path.join(__dirname, "./firestore.rules");

describe("firebase", () => {
  const projectId = "test-project";
  const userId = "test";
  const userPreferencesCollectionName = "USER_PREFERENCES";
  const app = firebase.initializeTestApp({
    projectId,
    auth: { uid: userId, email: "test@test.com" },
  });

  afterAll(async (done) => {
    try {
      await firebase.clearFirestoreData({
        projectId,
      });
      await app.delete();
      await Promise.all(firebase.apps().map((app) => app.delete()));
    } catch (e) {
      console.log("After All Error: ", e);
    } finally {
      done();
    }
  });

  describe("rules", () => {
    it("get user preferences", async (done) => {
      try {
        await firebase.loadFirestoreRules({
          projectId,
          rules: fs.readFileSync(RULES_PATH, "utf-8"),
        });
        const query = app
          ?.firestore()
          .collection(userPreferencesCollectionName)
          .doc(userId)
          .get();
        await firebase.assertSucceeds(query);
      } catch (e) {
        console.log("ERROR = ", e);
        expect(e).toBeFalsy();
      } finally {
        done();
      }
    });
  });
});
