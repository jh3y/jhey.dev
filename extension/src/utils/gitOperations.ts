import { exec } from "child_process";
import { promisify } from "util";
import { showToast, Toast } from "@raycast/api";

const execAsync = promisify(exec);

interface GitError extends Error {
  code?: number;
  stdout?: string;
  stderr?: string;
}

async function checkGitAvailability(): Promise<boolean> {
  console.log("Checking git availability...");
  try {
    const { stdout } = await execAsync("git --version");
    console.log("Git version:", stdout.trim());
    await showToast({
      style: Toast.Style.Success,
      title: "Git found",
      message: stdout.trim(),
    });
    return true;
  } catch (error) {
    console.error("Git not available:", error);
    await showToast({
      style: Toast.Style.Failure,
      title: "Git not available",
      message: "Please install git to use this feature",
    });
    return false;
  }
}

async function isGitRepository(directory: string): Promise<boolean> {
  console.log("Checking if directory is a git repository:", directory);
  try {
    const { stdout } = await execAsync("git rev-parse --is-inside-work-tree", {
      cwd: directory,
    });
    console.log("Git repository check result:", stdout.trim());
    await showToast({
      style: Toast.Style.Success,
      title: "Git repository found",
    });
    return true;
  } catch (error) {
    console.error("Not a git repository:", error);
    await showToast({
      style: Toast.Style.Failure,
      title: "Not a git repository",
      message: "The specified directory is not a git repository",
    });
    return false;
  }
}

async function pullChanges(directory: string): Promise<boolean> {
  console.log("Pulling latest changes from remote...");
  try {
    await showToast({
      style: Toast.Style.Animated,
      title: "Pulling changes",
      message: "Fetching latest changes from remote...",
    });

    const { stdout } = await execAsync("git pull", { cwd: directory });
    console.log("Pull result:", stdout.trim());

    await showToast({
      style: Toast.Style.Success,
      title: "Changes pulled",
      message: "Successfully pulled latest changes",
    });
    return true;
  } catch (error) {
    const gitError = error as GitError;
    console.error("Error pulling changes:", gitError);
    console.error("Error stdout:", gitError.stdout);
    console.error("Error stderr:", gitError.stderr);
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to pull changes",
      message: gitError.stderr || "Unknown error occurred",
    });
    return false;
  }
}

async function commitAndPushChanges(
  directory: string,
  filePath: string,
): Promise<boolean> {
  console.log("Starting commit and push process...");
  try {
    // Stage the specific file
    console.log("Staging file:", filePath);
    await showToast({
      style: Toast.Style.Animated,
      title: "Staging changes",
      message: "Preparing to commit...",
    });

    await execAsync(`git add "${filePath}"`, { cwd: directory });
    console.log("File staged successfully");

    // Check if there are any changes to commit
    console.log("Checking for changes to commit...");
    const { stdout: statusOutput } = await execAsync("git status --porcelain", {
      cwd: directory,
    });
    console.log("Git status:", statusOutput.trim());

    if (!statusOutput.trim()) {
      console.log("No changes to commit");
      await showToast({
        style: Toast.Style.Success,
        title: "No changes",
        message: "No changes to commit",
      });
      return true;
    }

    // Commit the changes
    console.log("Committing changes...");
    await showToast({
      style: Toast.Style.Animated,
      title: "Committing",
      message: "Creating commit...",
    });

    const { stdout: commitOutput } = await execAsync(
      'git commit -m "thought added"',
      { cwd: directory },
    );
    console.log("Commit result:", commitOutput.trim());

    // Push the changes
    console.log("Pushing changes...");
    await showToast({
      style: Toast.Style.Animated,
      title: "Pushing",
      message: "Pushing changes to remote...",
    });

    const { stdout: pushOutput } = await execAsync("git push", {
      cwd: directory,
    });
    console.log("Push result:", pushOutput.trim());

    await showToast({
      style: Toast.Style.Success,
      title: "Changes pushed",
      message: "Successfully pushed changes to remote",
    });

    return true;
  } catch (error) {
    const gitError = error as GitError;
    console.error("Error in commit/push process:", gitError);
    console.error("Error stdout:", gitError.stdout);
    console.error("Error stderr:", gitError.stderr);
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to commit/push changes",
      message: gitError.stderr || "Unknown error occurred",
    });
    return false;
  }
}

export async function handleGitOperations(
  directory: string,
  filePath: string,
  operation: "pull" | "push" = "push",
): Promise<boolean> {
  console.log("Starting git operations...");
  console.log("Directory:", directory);
  console.log("File path:", filePath);
  console.log("Operation:", operation);

  // Check if git is available
  const isGitAvailable = await checkGitAvailability();
  if (!isGitAvailable) {
    console.log("Git operations aborted: Git not available");
    return false;
  }

  // Check if directory is a git repository
  const isGitRepo = await isGitRepository(directory);
  if (!isGitRepo) {
    console.log("Git operations aborted: Not a git repository");
    return false;
  }

  if (operation === "pull") {
    return await pullChanges(directory);
  } else {
    return await commitAndPushChanges(directory, filePath);
  }
}
