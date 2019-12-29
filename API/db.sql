CREATE TABLE `access` (
  `id` int(15) NOT NULL,
  `ip` varchar(25) NOT NULL,
  `token` varchar(32) NOT NULL,
  `created` int(15) NOT NULL,
  `active` int(5) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


CREATE TABLE `msg` (
  `id` int(15) NOT NULL,
  `msg` varchar(255) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `created` int(15) NOT NULL,
  `deleted` int(15) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


ALTER TABLE `access`
  ADD PRIMARY KEY (`id`);

  
ALTER TABLE `msg`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `access`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `msg`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;
