---
title: "aa"
date: "2017-08-21"
---


aa.md


```go
func FindProviderRegions(provider string) []string {
	switch provider {
	case global.Aws:
		//cloudProvider := &AWSCloudProvider{}
		//return cloudProvider.GetRegions()
		return []string{"us-east-1", "us-east-2", "us-west-1", "us-west-2", "af-south-1", "ap-east-1", "ap-northeast-1", "ap-northeast-2", "ap-northeast-3", "ap-south-1", "ap-southeast-1", "ap-southeast-2", "ap-southeast-3", "ca-central-1", "eu-central-1", "eu-north-1", "eu-south-1", "eu-west-1", "eu-west-2", "eu-west-3", "me-south-1", "sa-east-1", "me-central-1"}
	default:
		return []string{}
	}
}

```