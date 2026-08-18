// mt-webfetch fallback fetcher via defuddle.md.
// Usage: go run ./scripts/newsletter fetch-via-defuddle <target_url>
// Exit codes: 0 = content returned, 1 = empty/failed, 2 = bad args.
// Note: `go run` collapses any nonzero program exit to 1, so callers invoking
// through `go run` can only distinguish success from failure — the stderr
// diagnostics carry the detail.
package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"
)

func runFetchViaDefuddle(args []string) {
	if len(args) < 1 || args[0] == "" {
		fmt.Fprintln(os.Stderr, "Usage: go run ./scripts/newsletter fetch-via-defuddle <target_url>")
		os.Exit(2)
	}
	target := args[0]
	defuddleURL := "https://defuddle.md/" + target

	fail := func(err error) {
		fmt.Fprintf(os.Stderr, "mt-webfetch: fetch failed for %s: %v\n", target, err)
		os.Exit(1)
	}

	req, err := http.NewRequest(http.MethodGet, defuddleURL, nil)
	if err != nil {
		fail(err)
	}
	req.Header.Set("User-Agent", "mt-webfetch/1.0")
	res, err := (&http.Client{Timeout: 30 * time.Second}).Do(req)
	if err != nil {
		fail(err)
	}
	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	if err != nil {
		fail(err)
	}
	ok := res.StatusCode >= 200 && res.StatusCode < 300
	if !ok || strings.TrimSpace(string(body)) == "" {
		fmt.Fprintf(os.Stderr, "mt-webfetch: defuddle returned %d / empty body for %s\n", res.StatusCode, target)
		os.Exit(1)
	}
	os.Stdout.Write(body)
}
