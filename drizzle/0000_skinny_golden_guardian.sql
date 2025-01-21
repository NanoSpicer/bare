CREATE TABLE `api_tokens` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`token` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);

CREATE UNIQUE INDEX `api_tokens_name_unique` ON `api_tokens` (`name`);
CREATE TABLE `files` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`contents` blob NOT NULL
);

CREATE TABLE `tagged_files` (
	`tag` text NOT NULL,
	`file_id` text NOT NULL,
	PRIMARY KEY(`file_id`, `tag`),
	FOREIGN KEY (`tag`) REFERENCES `tags`(`tag`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`file_id`) REFERENCES `files`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `tags` (
	`tag` text PRIMARY KEY NOT NULL
);
