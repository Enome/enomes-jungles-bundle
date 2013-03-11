IP = x.x.x.x

dump_local:
	@vagrant ssh -c 'pg_dump jungles' > vagrant/dump.sql

dump_online:
	@ssh root@$(IP) 'sudo -u postgres pg_dump sproutsheet' > vagrant/dump.sql

dump_media:
	@SCP root@$(IP) media

setup_server:
	@ssh root@$(IP) 'apt-get install puppet && curl https://raw.github.com/Enome/puppet/master/jungles.pp | puppet apply'
