// Detect whether an image URL is Substack-hosted and extract its S3 image UUID.
// Usage: go run ./scripts/newsletter detect-image-source "<image-url>"
// Output: JSON { original_url, clean_url, isSubstack, uuid?, innerUrl? }
//
// Substack images are usually served via a CDN wrapper:
//
//	https://substackcdn.com/image/fetch/$s_!x!,.../https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F<uuid>_WxH.png
//
// The publication is NOT encoded in the URL — only the image identity (uuid) is.
package main

import (
	"fmt"
	"net/url"
	"os"
	"strings"
)

// extractInnerURL pulls the inner S3 URL out of a substackcdn /image/fetch/
// wrapper (if present).
func extractInnerURL(target string) string {
	if marker := strings.Index(target, "/https%3A%2F%2F"); marker != -1 {
		decoded, err := url.PathUnescape(target[marker+1:])
		if err != nil {
			return target[marker+1:]
		}
		return decoded
	}
	// Some forms embed a plain (already-decoded) inner https URL.
	if len(target) > 8 {
		if plain := strings.Index(target[8:], "/https://"); plain != -1 {
			return target[8+plain+1:]
		}
	}
	return target
}

type detectImageOutput struct {
	OriginalURL string `json:"original_url"`
	CleanURL    string `json:"clean_url"`
	IsSubstack  bool   `json:"isSubstack"`
	UUID        string `json:"uuid,omitempty"`
	InnerURL    string `json:"innerUrl,omitempty"`
}

func runDetectImageSource(args []string) {
	if len(args) < 1 || args[0] == "" {
		fmt.Fprintln(os.Stderr, "Usage: go run ./scripts/newsletter detect-image-source <image-url>")
		os.Exit(1)
	}
	target := args[0]

	out := detectImageOutput{
		OriginalURL: target,
		CleanURL:    cleanURL(target),
		IsSubstack:  isSubstackImage(target),
	}
	if out.IsSubstack {
		out.UUID = substackImageUUID(target)
		out.InnerURL = extractInnerURL(target)
	}
	printJSON(out)
}
