// Newsletter engine for the mt-* skills — single binary, one subcommand per
// former Node script. Invoked from the repo root:
//
//	go run ./scripts/newsletter <command> [args]
//
// Repo-relative paths (content/post) resolve from the working directory, so
// the repo-root invocation contract from AGENTS.md still applies.
package main

import (
	"encoding/json"
	"fmt"
	"os"
)

func usage() {
	fmt.Fprint(os.Stderr, `Usage: go run ./scripts/newsletter <command> [args]

Commands:
  add-url <url>                              classify + dedup a URL, emit JSON route
  find-newsletter-number                     print the next newsletter number
  list-existing-tags                         tag frequencies, most-used first (top 40)
  detect-image-source <url>                  detect Substack image + uuid
  find-substack-post --uuid <uuid> [--deep]  find the post embedding an image uuid
  fetch-via-defuddle <url>                   fallback fetch via defuddle.md proxy
`)
}

// printJSON mirrors console.log(JSON.stringify(v, null, 2)): 2-space indent,
// no HTML escaping (URLs with & must stay readable), trailing newline.
func printJSON(v any) {
	enc := json.NewEncoder(os.Stdout)
	enc.SetEscapeHTML(false)
	enc.SetIndent("", "  ")
	if err := enc.Encode(v); err != nil {
		fmt.Fprintln(os.Stderr, "json encode:", err)
		os.Exit(1)
	}
}

func main() {
	if len(os.Args) < 2 {
		usage()
		os.Exit(1)
	}
	args := os.Args[2:]
	switch os.Args[1] {
	case "add-url":
		runAddURL(args)
	case "find-newsletter-number":
		runFindNewsletterNumber(args)
	case "list-existing-tags":
		runListExistingTags(args)
	case "detect-image-source":
		runDetectImageSource(args)
	case "find-substack-post":
		runFindSubstackPost(args)
	case "fetch-via-defuddle":
		runFetchViaDefuddle(args)
	default:
		fmt.Fprintf(os.Stderr, "unknown command: %s\n", os.Args[1])
		usage()
		os.Exit(1)
	}
}
